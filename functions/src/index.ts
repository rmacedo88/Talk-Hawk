'use strict';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

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
app.use(authenticate);


// ============================================================================
// Popula a coleção 'questions' no Google Cloud Firestore
// ============================================================================
/**
 * Este método só deve ser chamado se a coleção 'questions' estiver vazia ou não existir.
 * Está comentado por razões de segurança.
 */
app.put('/populateQuestionsCollection', (req, res) => {
  // questionsPopulate.populateQuestionsCollection(db, req, res);
  res.status(401).send('Você não tem autorização para chamar esse método.');
});


// ============================================================================
// Recupera a lista de questões fáceis e difíceis
// ============================================================================
/**
 * Esse método aceita os endpoints a seguir:
 * /questionsList/easy : Recupera a lista de questões fáceis
 * /questionsList/hard : Recupera a lista de questões difíceis
 */
app.get('/questionsList/:questionType', (req, res) => {

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

/**
 * Exporta a API tendo o url base : https://us-central1-tawk-hawk-dev.cloudfunctions.net/talkhawk
 * Os métodos subsequentes terão os seguintes endereços:
 * [# listQuestions: https://us-central1-tawk-hawk-dev.cloudfunctions.net/talkhawk/listQuestions]
 * etc...
 */
exports.talkhawk = functions.https.onRequest(app);
