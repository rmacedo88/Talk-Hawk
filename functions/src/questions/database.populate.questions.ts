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
    { level: 'easy', index: 1, text: '1 - O que significa "meaning" em inglês?', response: 'd', options: ['a - Origem', 'b - Cercado', 'c - Comida', 'd - Significado'] },
    { level: 'easy', index: 2, text: '2 - Como dizer que está apaixonado(a) em inglês?', response: 'a', options: ['a - I fall in love', 'b - I love her', 'c - I like her', 'd - I want and love her'] },
    { level: 'easy', index: 3, text: '3 - Quais cores abaixo são cores neutras?', response: 'd', options: ['a - Red and Blue', 'b - Green and Yellow', 'c - Blue and Grey', 'd - Grey and Black'] },
    { level: 'easy', index: 4, text: '4 - Qual dos itens abaixo não é uma comida?', response: 'b', options: ['a - Popcorn', 'b - Shell', 'c - Lettuce', 'd - Carrot'] },
    { level: 'easy', index: 5, text: '5 - Qual dos itens abaixo é uma comida?', response: 'c', options: ['a - Fence', 'b - Book', 'c - Chicken', 'd - Water'] },
    { level: 'easy', index: 6, text: '6 - Como se escreve corretamente o número 18 em inglês?', response: 'a', options: ['a - Eighteen', 'b - Eighty', 'c - Eighten', 'd - Eihigteen'] },
    { level: 'easy', index: 7, text: '7 - Qual dos itens abaixo é comumente encontrado em uma área urbana?', response: 'c', options: ['a - Cow', 'b - Fence', 'c - Traffic Light', 'd - Pig'] },
    { level: 'easy', index: 8, text: '8 - Qual dos itens abaixo não vemos em uma praia?', response: 'c', options: ['a - Sand', 'b - Sea', 'c - Airplane', 'd - Starfish'] },
    { level: 'easy', index: 9, text: '9 - Como dizer que algo pertence a ela?', response: 'd', options: ['a - It is she', 'b - It is from she', 'c - It isn\'t from her', 'd - It is her'] },
    { level: 'easy', index: 10, text: '10 - Pertencem à família, exceto?', response: 'c', options: ['a - Parents', 'b - Cousin', 'c - Salesman', 'd - Aunt'] },
    // [HARD questions array]
    { level: 'hard', index: 1, text: '1 - What is past participle?', response: 'a', options: ['a - the form of a verb, typically ending in -ed', 'b - the form of a word, typically ending in -ing', 'c - the form of a phrase that uses will', 'd - the form of a verb that previously uses will'] },
    { level: 'hard', index: 2, text: '2 - What is the meaning of Wassup?', response: 'd', options: ['a - O que é alto?', 'b - O que está em cima?', 'c - O que está acima de você?', 'd - Oi, tudo bem?'] },
    { level: 'hard', index: 3, text: '3 - What is the meaning of the expression "I Hear ya", commonly used in North America?', response: 'a', options: ['a - Eu te endendo', 'b - Eu te escutei', 'c - Eu escutei você', 'd - Eu escutarei você'] },
    { level: 'hard', index: 4, text: '4 - What it is not commonly found in an office?', response: 'c', options: ['a - Pencil', 'b - Shell', 'c - Horse ', 'd - Books'] },
    { level: 'hard', index: 5, text: '5 - Which one is the correct sentence?', response: 'a', options: ['a - Jane prefers homemade food and so does Henry', 'b - Jane prefers homemade food and so Henry does', 'c - Jane prefers homemade food and so Henry do', 'd - Jane prefer homemade food and so Henry does'] },
    { level: 'hard', index: 6, text: '6 - Which of the following is a drink?', response: 'c', options: ['a - Lettuce', 'b - Chocolate Bar', 'c - Juice', 'd - Pizza'] },
    { level: 'hard', index: 7, text: '7 - What of those are not in past form?', response: 'b', options: ['a - Began', 'b - Arise', 'c - Swam', 'd - Blew'] },
    { level: 'hard', index: 8, text: '8 - What of those are not in past participle form?', response: 'd', options: ['a - Arisen', 'b - Beaten', 'c - Chose', 'd - Crept'] },
    { level: 'hard', index: 9, text: '9 - Which one does not belong to the group?', response: 'c', options: ['a - Ant', 'b - Bee', 'c - Whale', 'd - Worm'] },
    { level: 'hard', index: 10, text: '10 - Which one does not belong to the group?', response: 'b', options: ['a - Notebook', 'b - Chicken', 'c - Computer', 'd - Hard Drive'] },
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
