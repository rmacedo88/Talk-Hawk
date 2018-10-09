'use strict';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as cors from 'cors';
import * as compression from 'compression';

import * as questionsPopulate from './exam-mode/database.populate.questions';
import * as questions from './exam-mode/list';
import * as careerPopulate from './career-mode/database.populate.career';


// Cria uma instância do Middleware Express
const app = express();
// Inicializa o modo ADMIN do Firebase
admin.initializeApp(functions.config().firebase);
// Recupera uma instância já configurada do Google Cloud Firestore
const db = admin.firestore();


// ============================================================================
// Configura a autenticação em nível de API
// ============================================================================

/*
 * Esse método configura esta api para responder somente após um usuário se autenticar no app.
 * Quaisquer requisições originadas em outros meios serão recusadas por razões de segurança.
 *
 * @param req HttpRequest
 * @param res HttpResponse
 * @param next Resultado da Promise em caso de sucesso na autenticação
 */
export const authenticate = ((req, res, next) => {

  // Valida se a requisição possui o atributo 'authorization' no cabeçalho e se este contém um token Bearer.
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    res.status(403)
      .send(`Acesso não autorizado. Você deve acrescentar o cabeçalho HTTP a seguir:
      Authorization: Bearer <Firebase ID Token>`);
    return;
  }

  // Recupera o valor do token fornecido no cabeçalho HTTP
  const firebaseAuthToken = req.headers.authorization.split('Bearer ')[1];

  // Chama uma promise do firebase cuja função é verificar o token gerado pela autenticação no Firebase
  admin.auth().verifyIdToken(firebaseAuthToken)
    .then((decodedFirebaseToken) => {
      req.user = decodedFirebaseToken;
      return next();
    })
    .catch(() => {
      console.error('Erro ao validar o token de acesso do usuário');
      res.status(403)
        .send('Token inválido');
    });

});


// Habilita o uso do Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: true }));


// Configura o método de autenticação padrão para as requisições à api
app.use(authenticate);

app.use(compression());


// ============================================================================
// API REST
// ============================================================================



// ============================================================================
// Popula a coleção 'questions' no Google Cloud Firestore
// ============================================================================
/**
 * Este método só deve ser chamado se a coleção 'questions' estiver vazia ou não existir.
 * Está comentado por razões de segurança.
 */
app.put('/populateQuestionsCollection', (req, res) => {
  questionsPopulate.populateQuestionsCollection(db, req, res);
  // res.status(401).send('Você não tem autorização para chamar esse método.');
});

app.put('/populate', (req, res) => {
  careerPopulate.populateCareerQuestionsCollection(db, req, res);
  // res.status(401).send('Você não tem autorização para chamar esse método.');
});


app.get('/career/answer/list', (req, res) => {
  db.collection('career-questions')
    .where('active', '==', true)
    .orderBy('created', 'desc')
    .get()
    .then(snapshotData => {

      const _questions: Array<any> = [];

      if (!snapshotData.empty) {
        snapshotData.forEach(doc => {
          _questions.push({ uid: doc.ref.id, ...doc.data() });
        });

        res.send(JSON.stringify(_questions));

      } else {
        res.status(400)
          .send('Não há questões cadastradas');
      }

    }).catch(error => {
      console.log(error);
      res.status(500)
        .send('Não foi possível realizar a consulta');
    })
});


// ============================================================================
// Recupera a lista de questões fáceis e difíceis
// ============================================================================
/**
 * Esse método aceita os endpoints a seguir:
 * /questions/list/easy : Recupera a lista de questões fáceis
 * /questions/list/hard : Recupera a lista de questões difíceis
 */
app.get('/questions/list/:questionType', (req, res) => {

  questions.list(db, res, { questionLevel: req.params.questionType })

});


// ============================================================================
// Valida as questões respondidas pelo usuário
// ============================================================================
/**
 * Esse método aceita os endpoints a seguir:
 * /questions/response/easy : Valida a resposta de uma das questões fáceis
 * /questions/response/hard : Valida a resposta de uma das questões difíceis
 *
 * Para ambos os casos, o body da requisição deve seguir o padrão a seguir:
 *
 * {
 *   questionUID: string [Id da questão avaliada. Esse id é o mesmo do documento dentro da collection 'questions'
 *   response: string [resposta do usuário - uma letra de 'a' a 'd']
 * }
 */
app.post('/questions/response/:questionType', (req, res) => {

  // [Valida os parâmetros de entrada]
  const _USER_UID = (req.body.userUID) ? req.body.userUID : res.status(400).send('Usuário não informado');
  const _QUESTION_UID = (req.body.questionUID) ? req.body.questionUID : res.status(400).send('Questão não informada');
  const _USER_RESPONSE = (req.body.response) ? req.body.response : res.status(400).send('Resposta do usuário não informada');

  let responseObject: any;

  // [Acessa a coleção de questões e recupera uma questão específica a partir do ID]
  db.collection('questions')
    .doc(_QUESTION_UID)
    .get()
    .then(questionData => {

      // [Checa se esse id de questão é válido]
      if (questionData.exists) {

        // [Arrow Function que determina se a questão foi respondida corretamente ou não. O retorno é booleano]
        const isQuestionRight = () => (_USER_RESPONSE === questionData.data().response);

        // [Registra a resposta do usuário na collection 'user-question-answer']
        db.collection('user-question-answer')
          .add({
            userUID: _USER_UID,
            questionUID: questionData.ref.id,
            examLevel: questionData.data().level,
            // Se a questão estiver correta, atribui os pontos, caso contrário, atribui ZERO
            pointsEarned: (isQuestionRight()) ? questionData.data().points : 0,
            isRight: isQuestionRight(),
            timestamp: new Date()
          });

        if (isQuestionRight()) {

          // [Atualiza a conta do usuário com seus pontos ganhos]
          db.collection('users')
            .doc(_USER_UID)
            .get()
            .then(userData => {

              if (questionData.data().level === 'easy') {
                userData.ref.update({
                  easyExamPoints: ((userData.data().easyExamPoints || 0) + questionData.data().points),
                  lastUpdate: new Date()
                });
              }

              if (questionData.data().level === 'hard') {
                userData.ref.update({
                  hardExamPoints: ((userData.data().hardExamPoints || 0) + questionData.data().points),
                  lastUpdate: new Date()
                });
              }

            })
            .catch(err => console.log('DEGUB: Erro ao atualizar usuário', err));
        }

        // [Adiciona os dados de retorno ao objeto enviado para o usuário]
        responseObject = {
          isCorrect: isQuestionRight(),
          points: (isQuestionRight()) ? questionData.data().points : 0
        };

        // [Envia a resposta para o usuário]
        res.send(responseObject);

      } else {
        // [Se a 'query' não retornou dados, devolve um erro para o usuário]
        res.status(300)
          .send({ error: 'O id informado não corresponde a uma questão válida.' });
      }

    })
    .catch(err => {
      // [Retorna um erro de ambiente]
      res.send(err);
    });

});


app.post('/career/questions/response', (req, res) => {
  // [Valida os parâmetros de entrada]
  const _USER_UID = (req.body.userUID) ? req.body.userUID : res.status(400).send('Usuário não informado');
  const _USER_RESPONSES = (req.body.responses) ? req.body.responses : res.status(400).send('Respostas do usuário não informadas');

  let responseObject: { title: string, description: string } = { title: '', description: '' };

  if (_USER_RESPONSES.left > 3) {
    responseObject = {
      title: 'AMBITIOUS',
      description: 'You are a person who never gives up on your dreams and who is always looking to conquer everything you want. It is someone who is extremely focused on his goals.'
    };
  }

  if (_USER_RESPONSES.right > 3) {
    responseObject = {
      title: 'EASYGOING',
      description: 'You are a person who has a lot of desire to turn your dreams into reality, but prefers to enjoy life is to let things happen naturally.'
    };
  }

  if (_USER_RESPONSES.left === 3 && _USER_RESPONSES.right === 3) {
    responseObject = {
      title: 'DIVIDED',
      description: 'You are a person who lives life one day at a time, your feelings may change according to the events and this can affect your personal and professional evolution.'
    };
  }

  // [Acessa os dados do usuário]
  db.collection('users')
    .doc(_USER_UID)
    .get()
    .then(userData => {

      // [Atualiza a personalidade do usuário]
      userData.ref.update({
        personality: responseObject.title,
        lastUpdate: new Date()
      });

      // [Grava o desempenho do usuário nessa partida do modo carreira]
      db.collection('career-question-answer')
        .add({
          userUID: _USER_UID,
          userName: userData.data().name,
          title: responseObject.title,
          description: responseObject.description,
          leftAnswers: _USER_RESPONSES.left,
          rightAnswers: _USER_RESPONSES.right,
          timestamp: new Date()
        });

    })
    .catch(err => console.log('DEGUB: Erro ao recuperar o usuário', err));

  // [Retorna ]
  res.send(responseObject);

});



// ============================================================================
// Recupera uma imagem do modo vocabulário por vez
// ============================================================================
/**
 * Esse método aceita o endpoint a seguir
 * /vocabulary : Vai retornar em formato JSON o texto referente à imagem e a imagem em gormato SVG.
 *
 * A primeira requisição não precisa enviar nada no body, a partir da segunda em diante o formato do body deve seguir esse formato:
 *
 * {
 *   vocabularyItemName: nome do campo "text" do último resultado retornado. Isso serve como cursor pra consulta no firebase.
 * }
 *
 * Para aumentar a performance dessa api, o número de imagens retornadas a cada chamada é limitada a uma única imagem.
 * Se o body não for informado, a primeira imagem será retornada.
 */
app.post('/vocabulary', (req, res) => {
  // [Valida o parâmetro enviado no body da requisição]
  const _VOCABULARY_TEXT = (req.body.vocabularyItemName) ? req.body.vocabularyItemName : null;

  // [Recupera o primeiro registro da collection "vocabulary"]
  const fisrt = db.collection('vocabulary')
    .orderBy('text')
    .limit(1);

  // [Executa a paginação de dados retornando um único registro por vez]
  const paginate = fisrt.get()
    .then(snapshotData => {

      // [Retorna uma referência para o último registro retornado pela página de resultados anterior]
      const last = snapshotData.docs[snapshotData.docs.length - 1];

      // [Retorna uma referência para a próxima página de resultados, tomando como base o texto recuperado do body como cursor]
      const next = db.collection('vocabulary')
        .orderBy('text')
        .startAfter(_VOCABULARY_TEXT || last.data().text)
        .limit(1);

      // [Recupera a próxima página de resultados]
      next.get().then(snap => {

        // [Objeto que conterá o JSON com a resposta retornada pelo firebase]
        let _question: any;

        // [Popula o objeto _question com os dados recuperados do Firebase]
        if (!snap.empty) {
          snap.forEach(doc => {
            _question = { uid: doc.ref.id, ...doc.data() };
          });

          // [Retorna o JSON contento o texto e a imagem em formato SVG]
          res.send(JSON.stringify(_question));

        } else {
          res.status(400)
            .send('Não há imagens cadastradas');
        }

      });


    }).catch(error => {
      console.log(error);
      res.status(500)
        .send('Não foi possível realizar a consulta');
    })
});

/**
 * Exporta a API tendo o url base : https://us-central1-tawk-hawk-dev.cloudfunctions.net/talkhawk
 */
exports.talkhawk = functions.https.onRequest(app);
