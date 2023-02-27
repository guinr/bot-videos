const { findVideoThemeCards, updateCardToRoadmap } = require('./trello');
const { gerarRoteiro } = require('./chatgpt');

const initialize = async () => {
  const cards = await findVideoThemeCards();
  if (!cards) {
    console.log('Nenhum card encontrado');
    return;
  };

  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    const roteiro = await gerarRoteiro(card.name);

    await updateCardToRoadmap(card, roteiro);
  }
}

//initialize();
setInterval(initialize, 20000);
