'use strict';

// ============================================================================
// Recupera uma lista com as questões fáceis ou as questões difíceis
// ============================================================================

/**
 * Acessa o Google Cloud Firestore para listar as questões
 * @param db ref. banco de dados
 * @param res http response
 * @param params é um objeto que possui o atributo 'questionLevel'. Seu valor pode conter as strings 'easy' ou 'hard'.
 */
export const list = ((db, res, params) => {

  db.collection('questions')
    // Funciona como uma cláusura where de um banco relacional, retorna os registros que possuam o atributo 'level' cujo valor seja igual a 'params.questionLevel'
    .where('level', '==', params.questionLevel)
    // procura apenas por questões 'ativas'
    .where('active', '==', true)
    // Ordena pelo atributo 'index' em ordem ascendente (do menor para o maior)
    .orderBy('index', 'asc')
    .get()
    .then(firestoreData => {

      // Array onde serão acumuladas todas as questões
      const questions: Array<any> = [];

      if (!firestoreData.empty) {
        // Caso a query forneça resultados, acumula todas as questões recuperadas no array questions
        firestoreData.forEach(doc => {
          // Agrega somente os dados relevantes para devolver um JSON mais enxuto
          const responseObj = { text: doc.data().text, options: doc.data().options, uid: doc.ref.id };
          questions.push(responseObj);
        });

        // Envia a lista de questões para o app
        res.send(JSON.stringify(questions));
      } else {
        // A collection de questões não possui dados por algum motivo
        res.status(400)
          .send('Não há questões cadastradas');
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500)
        .send('Não foi possível recuperar as questões do servidor ' + error);
    });

});
