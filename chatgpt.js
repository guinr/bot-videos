require('dotenv').config();
const axios = require('axios');

function gerarResposta(prompt, model, temperature, maxTokens) {
  return axios.post('https://api.openai.com/v1/engines/'+ model +'/completions', {
    prompt: prompt,
    temperature: temperature,
    max_tokens: maxTokens
  },
  {
    headers: {
      'Authorization': 'Bearer ' + process.env.API_KEY,
      'Content-Type': 'application/json'
    }
  })
  .then((response) => {
    return response.data.choices[0].text;
  })
  .catch((error) => {
    console.log(error);
  });
}

module.exports = { gerarResposta };
