require('dotenv').config();

const axios = require('axios');

const key = process.env.TRELLO_API_KEY;
const token = process.env.TRELLO_API_TOKEN;

const LIST_VIDEO_THEMES_ID = '63f912e5a7d3a47ed84b9b7a';
const LIST_ROADMAP_ID = '63f912f7582f4a61886e64b5';
const LIST_IMAGE_SEARCH_ID = '63f91315b45f351d860e196f';
const LIST_BACKGROUND_MUSIC_SEARCH_ID = '63f9135619a9532938ac76cf';
const LIST_GENERATE_VIDEO_ID = '63f91415235952f3e902e51b';
const LIST_CONCLUSION_ID = '63f914338498518064a54f18';

const findVideoThemeCards = () => {
  console.log('Buscando cards de temas');
  return findCards(LIST_VIDEO_THEMES_ID);
}

const findRoadmapCards = () => {
  console.log('Buscando cards de roteiro');
  return findCards(LIST_ROADMAP_ID);
}

const findImageSearchCards = () => {
  console.log('Buscando cards de busca de imagens');
  return findCards(LIST_IMAGE_SEARCH_ID);
}

const findBackgroundMusicCards = () => {
  console.log('Buscando cards de busca de música de fundo');
  return findCards(LIST_BACKGROUND_MUSIC_SEARCH_ID);
}

const findGenerateVideoCards = () => {
  console.log('Buscando cards de geração de vídeos');
  return findCards(LIST_GENERATE_VIDEO_ID);
}

const findCards = async (idList) => {
  try {
    const response = await axios.get(`https://api.trello.com/1/lists/${idList}/cards?key=${key}&token=${token}`);

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

const updateCardToRoadmap = async (card, desc) => {
  updateCardToList(card, {
    idList: LIST_ROADMAP_ID,
    desc
  });
}

const updateCardToImageSearch = async (card, attachments) => {
  updateCardToList(card, {
    idList: LIST_IMAGE_SEARCH_ID,
    attachments
  });
}

const updateCardToBackgroundMusic = async (card) => {
  updateCardToList(card, {
    idList: LIST_BACKGROUND_MUSIC_SEARCH_ID,
  });
}

const updateCardToGenerateVideo = async (card) => {
  updateCardToList(card, {
    idList: LIST_GENERATE_VIDEO_ID,
  });
}

const updateCardToConclusion = async (card) => {
  updateCardToList(card, {
    idList: LIST_CONCLUSION_ID,
  });
}

const updateCardToList = async (card, params) => {
  console.log(`Atualizando card: ${card.name} para a lista: ${params.idList}`);
  updateCard(card.id, params);
}

const updateCard = async (cardId, params) => {
  try {
    params = { key, token, ...params }
    await axios.put(`https://api.trello.com/1/cards/${cardId}`, params);

    if (params.attachments) {
      for (let index = 0; index < params.attachments.length; index++) {
        const attachment = params.attachments[index];
        params.url = attachment
        await axios.post(`https://api.trello.com/1/cards/${cardId}/attachments`, params);
      }
    }
    
    console.log(`Updated card: ${cardId} to roadmap`);
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
}

module.exports = {
  findVideoThemeCards,
  findRoadmapCards,
  findImageSearchCards,
  findBackgroundMusicCards,
  findGenerateVideoCards,
  updateCardToRoadmap,
  updateCardToImageSearch,
  updateCardToBackgroundMusic,
  updateCardToGenerateVideo,
  updateCardToConclusion
};
