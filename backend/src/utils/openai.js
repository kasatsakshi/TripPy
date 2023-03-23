import {Configuration, OpenAIApi} from 'openai'
import * as dotenv from 'dotenv' 

dotenv.config()
const configuration = new Configuration({
  apiKey: process.env.openApiKey,
});
const openai = new OpenAIApi(configuration);

// Example usage of the OpenAI API
const model = 'text-davinci-003';
const completions = 5;
const options = {
  maxTokens: 5,
  temperature: 0.5,
  n: 1,
  stop: '\n\n',
};

async function openaiquery(prompt)
 {
     console.log(prompt)
     const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1024,
      temperature: 0.5,
      n:1
     });
     console.log(response.data.choices[0].text.trim())
     return response.data.choices[0].text.trim()

//   openai.complete(prompt, { model, ...options, n: completions })
//   .then((response) => {
//       console.log(response)
//     console.log(response.data);
//     return (response.data)
//   })
//   .catch((error) => {
//     console.log(error);
//     return(error)
//   });
 }

export default openaiquery;