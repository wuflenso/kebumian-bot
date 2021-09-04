// Second Layer: Input processing and validations belong here

const ytservice = require('./youtube-api-service.js');

const COMMAND_WITH_KEYWORD = ['play', 'p', 'search', 's'];

function mapRequest(input) {
    let deserialized = input.split(' ');

    let command = deserialized[0].substring(1);
    deserialized.shift();
    let keyword = combineKeywords(deserialized);

    if (COMMAND_WITH_KEYWORD.includes(command) == true && keyword.length == 0) {
        return `You don't specify the keyword, dumbass`;
    }

    switch (command) {
        case 'p':
        case 'play':
            return 'playing ' + ytservice.searchVideo(keyword);
        case 's':
        case 'search':
            return 'searching ' + ytservice.searchVideo(keyword);
        case 'stop':
            return `please stop the music!`;
        default:
            return `your command is not registered`;
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

module.exports = { mapRequest };