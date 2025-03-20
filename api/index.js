const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());

app.get('/api/stock/:ticker', async (req, res) => {
    try {
        const { ticker } = req.params;
        const response = await fetch(
            `https://api.stockdata.org/v1/data/quote?symbols=${ticker}&api_token=${process.env.STOCK_API_KEY}`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching stock data:', error);
        res.status(500).json({ error: 'Failed to fetch stock data' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app; 