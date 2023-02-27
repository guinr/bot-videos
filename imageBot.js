const { findRoadmapCards, updateCardToImageSearch } = require('./trello');
const { search } = require('./google');

const initialize = async () => {
  const cards = await findRoadmapCards();
  if (!cards) {
    console.log('Nenhum card encontrado');
    return;
  };

  for (let index = 0; index < cards.length; index++) {
    const card = cards[index];

    const searchTerm = card.labels.map(label => label.name).join(' ');
    if (searchTerm.trim().length === 0) return;
    const attachments = await search(searchTerm);

    updateCardToImageSearch(card, attachments);
  }
}

//initialize();
setInterval(initialize, 10000);