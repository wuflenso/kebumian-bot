// Third Layer: Youtube API V3 Service

const { google } = require('googleapis');
const youtube = google.youtube('v3');

async function getTopVideo(client, searchKeyword) {
    const res = await youtube.search.list({
        q: searchKeyword,
        part: 'snippet',
        maxResults: 1
    });

    console.log(`https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`);
    return `https://www.youtube.com/watch?v=${res.data.items[0].id.videoId}`;
}

async function searchVideo(client, searchKeyword) {
    const res = await youtube.search.list({
        q: searchKeyword,
        part: 'snippet',
        maxResults: 5
    });

    let list = [];
    res.data.items.forEach(item =>{
        list.push(item.snippet.title);
    });

    console.log(list);
    return list;
}

module.exports = { searchVideo, getTopVideo };