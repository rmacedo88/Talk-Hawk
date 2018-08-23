'use strict';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as cors from 'cors';

import * as questionsPopulate from './questions/database.populate.questions';
import * as questions from './questions/list';


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


// Configura o método de autenticação padrão para as requisições à api
// app.use(authenticate);

// Habilita o uso do Cross-Origin Resource Sharing (CORS)
app.use(cors({ origin: true }));



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


// ============================================================================
// Recupera a lista de questões fáceis e difíceis
// ============================================================================
/**
 * Esse método aceita os endpoints a seguir:
 * /questions/list/easy : Recupera a lista de questões fáceis
 * /questions/list/hard : Recupera a lista de questões difíceis
 */
app.get('/questions/list/:questionType', (req, res) => {

  // const obrigatorio = () => { throw new Error('Parâmetro Obrigatório') };
  // const add = (a: number = obrigatorio(), b: number = obrigatorio()) => a + b;
  // add(1);

  // [Lê o valor do parâmetro de requisição definido na rota do método :questionType, são aceitos os valores 'easy' e 'hard']
  switch (req.params.questionType) {
    case 'easy':
      // [Retorna a lista de questões fáceis]
      questions.list(db, req, res, { questionLevel: 'easy' });
      break;
    case 'hard':
      // [Retorna a lista de questões difíceis]
      questions.list(db, req, res, { questionLevel: 'hard' });
      break;
    default:
      res.status(400)
        .send('Acrescente "/easy" ou "/hard" ao endpoint para concluir sua solicitação.');
      break;
  }
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

  let responseObject: any;

  // [Acessa a coleção de questões e recupera uma questão específica a partir do ID]
  db.collection('questions')
    .doc(req.body.questionUID)
    .get()
    .then(questionData => {

      // [Checa se esse id de questão é válido]
      if (questionData.exists) {

        // [Arrow Function que determina se a questão foi respondida corretamente ou não. O retorno é booleano]
        const isQuestionRight = () => (req.body.response === questionData.data().response);

        // [Registra a resposta do usuário na collection 'user-question-answer']
        db.collection('user-question-answer')
          .add({
            userUID: 1,
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
            .doc('1')
            .get()
            .then(userData => {

              if (questionData.data().level === 'easy') {
                userData.ref.update({
                  easyExamPoints: (userData.data().easyExamPoints + questionData.data().points),
                  lastUpdate: new Date()
                });
              }

              if (questionData.data().level === 'hard') {
                userData.ref.update({
                  hardExamPoints: (userData.data().hardExamPoints + questionData.data().points),
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
        res.send({ error: 'O id informado não corresponde a uma questão válida.' });
      }

    })
    .catch(err => {
      console.log(err);
      // [Retorna um erro de ambiente]
      res.send(err);
    });

});


/**
 * Exporta a API tendo o url base : https://us-central1-tawk-hawk-dev.cloudfunctions.net/talkhawk
 */
exports.talkhawk = functions.https.onRequest(app);
