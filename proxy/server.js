const express = require('express');
const cors = require('cors');
const axios = require('axios');
const https = require('https');

const app = express();
const PORT = 3001;
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

app.use(cors());
app.use(express.json());

app.post('/api/oauth', async (req, res) => {
  let authKey = req.headers.authorization;
  console.log('=== OAUTH REQUEST ===');
  console.log('1. Raw header from frontend:', authKey);
  
  if (authKey?.startsWith('Basic ')) {
    console.log('2. Removed "Basic " prefix');
    authKey = authKey.substring(6);
  }
  if (authKey?.startsWith('Bearer ')) {
    console.log('2. Removed "Bearer " prefix');
    authKey = authKey.substring(7);
  }
  
  console.log('3. Final key for Sber (first 30 chars):', authKey?.substring(0, 30) + '...');
  console.log('4. Sending to Sber with: Basic <key>');
  
  try {
    const response = await axios.post(
      'https://ngw.devices.sberbank.ru:9443/api/v2/oauth',
      'scope=GIGACHAT_API_PERS',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${authKey}`,
          'RqUID': generateRqUID(),
        },
        httpsAgent,
        timeout: 15000,
      }
    );
    console.log(' OAuth success:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error(' OAuth error:', error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  let accessToken = req.headers.authorization;
  console.log('\n=== CHAT REQUEST ===');
  console.log('1. Raw token from frontend:', accessToken?.substring(0, 30) + '...');
  
  if (accessToken?.startsWith('Bearer ')) {
    console.log('2. Removed "Bearer " prefix');
    accessToken = accessToken.substring(7);
  }
  
  console.log('3. Final token for Sber (first 30 chars):', accessToken?.substring(0, 30) + '...');
  console.log('4. Request body preview:', JSON.stringify(req.body).substring(0, 100) + '...');
  
  try {
    const response = await axios.post(
      'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        httpsAgent,
        timeout: 30000,
      }
    );
    console.log(' Chat success:', response.status);
    res.json(response.data);
  } catch (error) {
    console.error(' Chat error:', error.response?.status);
    console.error(' Response body:', error.response?.data);
    res.status(error.response?.status || 500).json({ 
      error: error.message,
      details: typeof error.response?.data === 'string' 
        ? error.response.data.substring(0, 200) 
        : error.response?.data 
    });
  }
});

function generateRqUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
}

app.listen(PORT, () => {
  console.log(`Proxy on http://localhost:${PORT}`);
});