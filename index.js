const { gerarResposta } = require('./chatgpt');

const prompt = 'Crie um roteiro interessante de um minuto contando como surgiu o jogo mário';
const model = 'text-davinci-002';
const temperature = 1;
const maxTokens = 1000;

gerarResposta(prompt, model, temperature, maxTokens)
  .then((resposta) => {
    console.log(resposta)
  })
  .catch((error) => {
    console.error(error);
  });
