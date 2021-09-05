// Second Layer: Input processing and validations belong here

const ytservice = require('./youtube-api-service.js');
const gauth = require('./google-oauth2.js');

const COMMAND_WITH_KEYWORD = ['play', 'p', 'search', 's'];
const scopes = ['https://www.googleapis.com/auth/youtubepartner'];

async function initialAuthentication(){
    gauth.authenticate(scopes);
}

async function mapRequest(input, msgInstance) {

    let deserialized = input.split(' ');
    let command = deserialized[0].substring(1);
    deserialized.shift();
    let keyword = combineKeywords(deserialized);

    if (COMMAND_WITH_KEYWORD.includes(command) == true && keyword.length == 0) {
        return msgInstance.reply(`You don't specify the keyword, dumbass`);
    }

    if (command == 'p' || command == 'play') {
        ytservice.getTopVideo(gauth.oauth2Client, keyword)
            .then(videoUrl => {
                return msgInstance.reply(`Playing  ${videoUrl}`);
            })
            .catch(console.error);
    } else if (command == 's' || command == 'search') {
        ytservice.searchVideo(gauth.oauth2Client, keyword)
            .then(videoTitles => {
                return msgInstance.reply(`Search Results: \n${addNewLines(videoTitles)}`);
            })
            .catch(console.error);
    } else if (command == 'stop') {
        return msgInstance.reply(`Please stop the music!`);
    } else {
        return msgInstance.reply(`Your command is not registered`);
    }
}

function combineKeywords(wordArray) {

    let keyword = '';
    for (i = 0; i < wordArray.length; i++) {
        keyword += wordArray[i];
        if (wordArray[i] == wordArray.length - 1) {
            break;
        }
        keyword += ' ';
    }

    return keyword
}

function addNewLines(wordArray) {

    let keyword = '';
    for (i = 0; i < wordArray.length; i++) {
        keyword += wordArray[i];
        if (wordArray[i] == wordArray.length - 1) {
            break;
        }
        keyword += '\n';
    }

    return keyword
}

module.exports = { mapRequest, initialAuthentication };