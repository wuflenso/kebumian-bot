/*
 * Third Layer: Youtube API V3 Service
 */

const { google } = require('googleapis');
const youtube = google.youtube('v3');

async function getTopVideo(client, searchKeyword) {
    const res = await youtube.search.list({
        q: searchKeyword,
        part: 'snippet',
        maxResults: 1
    });

    let result = (`[${res.data.items[0].snippet.title}](https://www.youtube.com/watch?v=${res.data.items[0].id.videoId})`);
    console.log(result);
    return result;
}

async function searchVideo(client, searchKeyword) {
    const res = await youtube.search.list({
        q: searchKeyword,
        part: 'snippet',
        maxResults: 5
    });

    let hash = new Map();
    res.data.items.forEach(item => {
        hash.set(item.snippet.title, `https://www.youtube.com/watch?v=${item.id.videoId}`);
    });

    console.log(hash);
    return hash;
}

module.exports = { searchVideo, getTopVideo };