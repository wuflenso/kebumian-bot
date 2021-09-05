// Second Layer: Input processing and validations belong here

const ytservice = require('./youtube-api-service.js');
const gauth = require('./google-oauth2.js');

const COMMAND_WITH_KEYWORD = ['play', 'p', 'search', 's'];
const scopes = ['https://www.googleapis.com/auth/youtubepartner'];

async function mapRequest(input, msgInstance) {
    let request = manageCommands(input);

    if (COMMAND_WITH_KEYWORD.includes(request[0]) == true && request[1].length == 0) {
        return msgInstance.reply(`You don't specify the keyword, dumbass`);
    }

    if (request[0] == 'p' || request[0] == 'play') {
        gauth.authenticate(scopes)
            .then(client => ytservice.getTopVideo(client, request[1])
                .then(videoUrl => {
                    return msgInstance.reply(`playing  ${videoUrl}`);
                }))
            .catch(console.error);
    } else if (request[0] == 's' || request[0] == 'search') {
        gauth.authenticate(scopes)
            .then(client => ytservice.searchVideo(client, request[1])
                .then(videoUrl => {
                    return msgInstance.reply(`search ${videoUrl.toString()}`);
                }))
            .catch(console.error);
    } else if (request[0] == 'stop') {
        return msgInstance.reply(`please stop the music!`);
    } else {
        return msgInstance.reply(`your command is not registered`);
    }

}

function manageCommands(input) {
    let deserialized = input.split(' ');

    let command = deserialized[0].substring(1);
    deserialized.shift();
    let keyword = combineKeywords(deserialized);

    return [command, keyword];
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

module.exports = { mapRequest };