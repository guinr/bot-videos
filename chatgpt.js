require('dotenv').config();

const axios = require('axios');

const model = 'text-davinci-003';
const temperature = 0.7;
const maxTokens = 500;

const gerarRoteiro = async (tema) => {
  try {
    const response = await axios.post('https://api.openai.com/v1/engines/'+ model +'/completions', {
      prompt: tema,
      temperature: temperature,
      max_tokens: maxTokens
    },
    {
      headers: {
        'Authorization': 'Bearer ' + process.env.API_KEY,
        'Content-Type': 'application/json'
      }
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = { gerarRoteiro };
