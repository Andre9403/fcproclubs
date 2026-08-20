const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

const EA_HEADERS = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    'Referer': 'https://www.ea.com/',
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin': 'https://www.ea.com'
};

// 1. Endpoint Stats Pemain
app.get('/api/stats', async (req, res) => {
    const { platform = 'common-gen5', clubId = '7089906' } = req.query;
    const targetUrl = `https://proclubs.ea.com/api/fc/members/stats?platform=${platform}&clubId=${clubId}`;

    try {
        const response = await axios.get(targetUrl, { headers: EA_HEADERS, timeout: 10000 });
        res.json(response.data);
    } catch (err) {
        console.error('Error EA Stats:', err.message);
        res.status(err.response ? err.response.status : 500).json({ error: 'Gagal mengambil stats', details: err.message });
    }
});

// 2. Endpoint Match History (League / Playoff)
app.get('/api/matches', async (req, res) => {
    const { platform = 'common-gen5', clubId = '7089906', matchType = 'leagueMatch' } = req.query;
    const targetUrl = `https://proclubs.ea.com/api/fc/clubs/matches?platform=${platform}&clubIds=${clubId}&matchType=${matchType}`;

    try {
        const response = await axios.get(targetUrl, { headers: EA_HEADERS, timeout: 10000 });
        res.json(response.data);
    } catch (err) {
        console.error('Error EA Matches:', err.message);
        res.status(err.response ? err.response.status : 500).json({ error: 'Gagal mengambil match history', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server siap! Buka http://localhost:${PORT}`);
});