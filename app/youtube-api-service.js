// Third Layer: Youtube API V3 Service

const gauth = require('./google-oauth2.js');
const { google } = require('googleapis');
const youtube = google.youtube('v3');

async function getTopVideo(client, searchKeyword) {
    const res = await youtube.search.list({
        q: searchKeyword,
        part: 'snippet'
    })
    console.log(`https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`);
    return `https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`;
}

// Define Scopes.
const scopes = ['https://www.googleapis.com/auth/youtubepartner'];

// Wrapper method for index.js
async function searchVideo(searchKeyword) {

    // Authenticate and run API
    gauth.authenticate(scopes)
        .then(client => getTopVideo(client, searchKeyword))
        .catch(console.error);
}

module.exports = { searchVideo, getTopVideo };