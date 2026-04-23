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
  try {
    let authKey = req.headers.authorization;
    if (!authKey) return res.status(400).json({ error: 'No authorization key' });
    if (authKey.startsWith('Basic ')) authKey = authKey.substring(6);
    if (authKey.startsWith('Bearer ')) authKey = authKey.substring(7);

    const response = await axios.post(
      'https://ngw.devices.sberbank.ru:9443/api/v1/oauth',
      'scope=GIGACHAT_API_PERS',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': `Basic ${authKey}`,
          'RqUID': generateRqUID(),
        },
        httpsAgent,
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('OAuth error:', error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    let accessToken = req.headers.authorization;
    if (!accessToken) return res.status(400).json({ error: 'No access token' });
    if (accessToken.startsWith('Bearer ')) accessToken = accessToken.substring(7);

    const response = await axios.post(
      'https://gigachat.devices.sberbank.ru/api/v1/chat/completions',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        httpsAgent,
        timeout: 30000,
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Chat error:', error.response?.status, error.response?.data);
    res.status(error.response?.status || 500).json({ 
      error: error.message,
      details: typeof error.response?.data === 'string' ? error.response.data : error.response?.data,
    });
  }
});

function generateRqUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});