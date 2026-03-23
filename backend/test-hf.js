const axios = require('axios');
require('dotenv').config();

const prompt = 'Act as a Career Counselor. Reply {"career": "Engineer"}';

const { HfInference } = require('@huggingface/inference');
require('dotenv').config();

const hf = new HfInference(process.env.HF_API_KEY);
const promptText = 'Act as a Career Counselor. Reply {"career": "Engineer"}';

hf.chatCompletion({
  model: 'Qwen/Qwen2.5-7B-Instruct',
  messages: [{ role: 'user', content: promptText }]
}).then(res => {
  console.log('SUCCESS:', res.choices[0].message);
}).catch(err => {
  console.error('ERROR RESPONSE:', err.message);
});


