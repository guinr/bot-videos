require('dotenv').config();

const google = require('googleapis').google;
const customSearch = google.customsearch('v1');
const googleSearchApiKey = process.env.GOOGLE_SEARCH_API_KEY;
const googleSearchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;

const search = async (query) => {
  console.log(`Buscando imagens relacionadas a: ${query}`);

  const response = await customSearch.cse.list({
    auth: googleSearchApiKey,
    cx: googleSearchEngineId,
    searchType: 'image',
    q: query,
    num: 2,
  });

  return response.data.items.map(item => {
    return item.link;
  });
}

module.exports = {
  search,
};