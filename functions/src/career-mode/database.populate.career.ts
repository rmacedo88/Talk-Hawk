'use strict';

import * as admin from 'firebase-admin';

// ============================================================================
// Popula a coleção 'career-questions'
// ============================================================================

/**
 * Script que faz a carga inicial dos dados dentro do Google Cloud Firestore
 * @param db ref. banco de dados
 * @param req http request
 * @param res http response
 */
export const populateCareerQuestionsCollection = ((db, req, res) => {

  const questionsRawData: Array<any> = [
    // [Career questions array]
    { active: true, text: 'Dentre essas, qual sua cor preferida?', leftSide: 'Red', rightSide: 'Blue' },
    { active: true, text: 'Você se acha uma pessoa persistente?', leftSide: 'Of course', rightSide: 'No' },
    { active: true, text: 'Você se considera uma pessoa?', leftSide: 'Confident', rightSide: 'Insecure' },
    { active: true, text: 'Você normalmente é movido pela?', leftSide: 'Reason', rightSide: 'Emotion' },
    { active: true, text: 'Você é mais?', leftSide: 'Realist', rightSide: 'Optimistic' },
    { active: true, text: 'Qual dessas características é mais forte em você?', leftSide: 'Persistence', rightSide: 'Tranquility' },
  ];

  // Referência para a coleção 'career-questions'
  const questionsRef = db.collection('career-questions');

  // [INICIO começa a inserir os registros no banco de dados]
  questionsRawData.forEach(question => {
    question.created = admin.firestore.FieldValue.serverTimestamp();
    questionsRef.add(question);
  });
  // [FIM conclui a inserção dos registros]

  // Envia um feedback para o usuário
  res.send(`Aguarde enquanto os dados são persistidos, não execute essa função outra
   vez ou terá dados duplicados no banco de dados.
   É recomendado aguardar entre 30 segundos a um minuto até que todas as informações estejam prontas para uso.`);
});
