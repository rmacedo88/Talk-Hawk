'use strict';

// ============================================================================
// Popula a coleção 'questions'
// ============================================================================

/**
 * Script que faz a carga inicial dos dados dentro do Google Cloud Firestore
 * @param db ref. banco de dados
 * @param req http request
 * @param res http response
 */
export const populateQuestionsCollection = ((db, req, res) => {

  const easyQuestionsRawData: Array<any> = [
    // [EASY questions array]
    { level: 'easy', active: true, index: 1, text: 'O que significa "meaning" em inglês?', response: 'd', options: ['Origem', 'Cercado', 'Comida', 'Significado'] },
    { level: 'easy', active: true, index: 2, text: 'Como dizer que está apaixonado(a) em inglês?', response: 'a', options: ['I fall in love', 'I love her', 'I like her', 'I want and love her'] },
    { level: 'easy', active: true, index: 3, text: 'Quais cores abaixo são cores neutras?', response: 'd', options: ['Red and Blue', 'Green and Yellow', 'Blue and Grey', 'Grey and Black'] },
    { level: 'easy', active: true, index: 4, text: 'Qual dos itens abaixo não é uma comida?', response: 'b', options: ['Popcorn', 'Shell', 'Lettuce', 'Carrot'] },
    { level: 'easy', active: true, index: 5, text: 'Qual dos itens abaixo é uma comida?', response: 'c', options: ['Fence', 'Book', 'Chicken', 'Water'] },
    { level: 'easy', active: true, index: 6, text: 'Como se escreve corretamente o número 18 em inglês?', response: 'a', options: ['Eighteen', 'Eighty', 'Eighten', 'Eihigteen'] },
    { level: 'easy', active: true, index: 7, text: 'Qual dos itens abaixo é comumente encontrado em uma área urbana?', response: 'c', options: ['Cow', 'Fence', 'Traffic Light', 'Pig'] },
    { level: 'easy', active: true, index: 8, text: 'Qual dos itens abaixo não vemos em uma praia?', response: 'c', options: ['Sand', 'Sea', 'Airplane', 'Starfish'] },
    { level: 'easy', active: true, index: 9, text: 'Como dizer que algo pertence a ela?', response: 'd', options: ['It is she', 'It is from she', 'It isn\'t from her', 'It is her'] },
    { level: 'easy', active: true, index: 10, text: 'Pertencem à família, exceto?', response: 'c', options: ['Parents', 'Cousin', 'Salesman', 'Aunt'] },
    // [HARD questions array]
    { level: 'hard', active: true, index: 1, text: 'What is past participle?', response: 'a', options: ['The form of a verb, typically ending in -ed', 'The form of a word, typically ending in -ing', 'The form of a phrase that uses will', 'The form of a verb that previously uses will'] },
    { level: 'hard', active: true, index: 2, text: 'What is the meaning of Wassup?', response: 'd', options: ['O que é alto?', 'O que está em cima?', 'O que está acima de você?', 'Oi, tudo bem?'] },
    { level: 'hard', active: true, index: 3, text: 'What is the meaning of the expression "I Hear ya", commonly used in North America?', response: 'a', options: ['Eu te endendo', 'Eu te escutei', 'Eu escutei você', 'Eu escutarei você'] },
    { level: 'hard', active: true, index: 4, text: 'What it is not commonly found in an office?', response: 'c', options: ['Pencil', 'Shell', 'Horse ', 'Books'] },
    { level: 'hard', active: true, index: 5, text: 'Which one is the correct sentence?', response: 'a', options: ['Jane prefers homemade food and so does Henry', 'Jane prefers homemade food and so Henry does', 'Jane prefers homemade food and so Henry do', 'Jane prefer homemade food and so Henry does'] },
    { level: 'hard', active: true, index: 6, text: 'Which of the following is a drink?', response: 'c', options: ['Lettuce', 'Chocolate Bar', 'Juice', 'Pizza'] },
    { level: 'hard', active: true, index: 7, text: 'What of those are not in past form?', response: 'b', options: ['Began', 'Arise', 'Swam', 'Blew'] },
    { level: 'hard', active: true, index: 8, text: 'What of those are not in past participle form?', response: 'd', options: ['Arisen', 'Beaten', 'Chose', 'Crept'] },
    { level: 'hard', active: true, index: 9, text: 'Which one does not belong to the group?', response: 'c', options: ['Ant', 'Bee', 'Whale', 'Worm'] },
    { level: 'hard', active: true, index: 10, text: 'Which one does not belong to the group?', response: 'b', options: ['Notebook', 'Chicken', 'Computer', 'Hard Drive'] },
  ];

  // Referência para a coleção 'question'
  const easyQuestionsRef = db.collection('questions');

  // [INICIO começa a inserir os registros no banco de dados]
  easyQuestionsRawData.forEach(question => {
    easyQuestionsRef.add(question);
  });
  // [FIM conclui a inserção dos registros]

  // Envia um feedback para o usuário
  res.send(`Aguarde enquanto os dados são persistidos, não execute essa função outra
   vez ou terá dados duplicados no banco de dados.
   É recomendado aguardar entre 30 segundos a um minuto até que todas as informações estejam prontas para uso.`);
});
