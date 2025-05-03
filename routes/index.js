const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Aquí tu API KEY de Firebase (opcional si usas endpoints protegidos)
const FIREBASE_API_KEY = 'TU_API_KEY_OPCIONAL';

app.post('/proxy', async (req, res) => {
  try {
    const { url, method = 'GET', data = {}, headers = {} } = req.body;

    const response = await axios({
      url,
      method,
      data,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('[Proxy Error]', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy Server Running on port ${PORT}`);
});
