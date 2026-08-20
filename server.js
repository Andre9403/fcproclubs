const express = require('express');
const cors = require('cors');
const path = require('path');
const { fetch } = require('undici');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// URL Cloudflare Worker yang baru kamu buat
const PROXY_URL = 'https://ea-fc-proxy.andre-agustan.workers.dev';

// 1. Endpoint Stats Pemain
app.get('/api/stats', async (req, res) => {
    const { platform = 'common-gen5', clubId = '7089906' } = req.query;
    const targetUrl = `${PROXY_URL}/api/fc/members/stats?platform=${platform}&clubId=${clubId}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error Stats:', err.message);
        res.status(500).json({ error: 'Gagal mengambil stats dari EA', details: err.message });
    }
});

// 2. Endpoint Match History
app.get('/api/matches', async (req, res) => {
    const { platform = 'common-gen5', clubId = '7089906', matchType = 'leagueMatch', maxResultCount = '10' } = req.query;
    const targetUrl = `${PROXY_URL}/api/fc/clubs/matches?platform=${platform}&clubIds=${clubId}&matchType=${matchType}&maxResultCount=${maxResultCount}`;

    try {
        const response = await fetch(targetUrl);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error('Error Matches:', err.message);
        res.status(500).json({ error: 'Gagal mengambil match history dari EA', details: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server jalan di http://localhost:${PORT}`);
});

module.exports = app;