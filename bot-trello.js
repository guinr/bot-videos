require('dotenv').config();
const axios = require('axios');

const boardId = 'fsH57NzH';
const apiKey = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

const LIST_VIDEO_THEMES_ID = '63f912e5a7d3a47ed84b9b7a';
const LIST_ROADMAP_ID = '63f912f7582f4a61886e64b5';
const LIST_IMAGE_SEARCH_ID = '63f91315b45f351d860e196f';
const LIST_BACKGROUND_MUSIC_SEARCH_ID = '63f9135619a9532938ac76cf';
const LIST_GENERATE_VIDEO_ID = '63f91415235952f3e902e51b';
const LIST_CONCLUSION_ID = '63f914338498518064a54f18';

const initialize = async () => {
  const cards = await findCards()
  processRoadmap(cards);
}

const findCards = async () => {
  try {
    const response = await axios.get(`https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${token}`);

    if (response.data.length > 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

const processRoadmap = (cards) => {
  cards.forEach(card => {
    if (card.idList === LIST_VIDEO_THEMES_ID) {
      updateCardToRoadmap(card.id);
      //busca chatgpt

    }
  });
}

const updateCardToRoadmap = async (cardId) => {
  try {
    await axios.put(`https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`, {
      idList: LIST_ROADMAP_ID
    });
    
    console.log(`Updated card: ${cardId} to roadmap`);
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
}

initialize()
