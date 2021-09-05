// Third Layer: Youtube API V3 Service

const gauth = require('./google-oauth2.js');
const { google } = require('googleapis');
const youtube = google.youtube('v3');

async function getTopVideo(client, searchKeyword) {
    const res = await youtube.search.list({
        q: searchKeyword,
        part: 'snippet',
        maxResults: 1
    })
    console.log(`https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`);
    return `https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`;
}

async function searchVideo(searchKeyword) {
    const res = await youtube.search.list({
        q: searchKeyword,
        part: 'snippet',
        maxResults: 5
    })
    console.log(res.data.items);
    return `result: ${res.data.items}`;
}

module.exports = { searchVideo, getTopVideo };