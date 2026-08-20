const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Header lengkap agar tidak terdeteksi bot
const getHeaders = () => ({
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
    'Referer': 'https://www.ea.com/',
    'Origin': 'https://www.ea.com',
    'Sec-Ch-Ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-site'
});

// 1. Endpoint Stats Pemain
app.get('/api/stats', async (req, res) => {
    const { platform = 'common-gen5', clubId = '7089906' } = req.query;
    const targetUrl = `https://proclubs.ea.com/api/fc/members/stats?platform=${platform}&clubId=${clubId}`;

    try {
        const response = await axios.get(targetUrl, { headers: getHeaders(), timeout: 10000 });
        res.json(response.data);
    } catch (err) {
        console.error('Error EA Stats:', err.message);
        res.status(err.response ? err.response.status : 500).json({ error: 'Gagal mengambil stats', details: err.message });
    }
});

// 2. Endpoint Match History
app.get('/api/matches', async (req, res) => {
    const { platform = 'common-gen5', clubId = '7089906', matchType = 'leagueMatch', maxResultCount = '10' } = req.query;
    const targetUrl = `https://proclubs.ea.com/api/fc/clubs/matches?platform=${platform}&clubIds=${clubId}&matchType=${matchType}&maxResultCount=${maxResultCount}`;

    try {
        const response = await axios.get(targetUrl, { headers: getHeaders(), timeout: 10000 });
        res.json(response.data);
    } catch (err) {
        console.error('Error EA Matches:', err.message);
        res.status(err.response ? err.response.status : 500).json({ error: 'Gagal mengambil match history', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server jalan di port ${PORT}`);
});

module.exports = app;