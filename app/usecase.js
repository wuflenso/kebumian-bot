/*
 * Second Layer: Input processing and validations belong here
 */

const discordEmbeds = require('./discord-embed-template.js');
const ytservice = require('./youtube-api-service.js');
const gauth = require('./google-oauth2.js');

const commandWithKeyword = ['play', 'p', 'search', 's'];
const scopes = ['https://www.googleapis.com/auth/youtubepartner'];

async function initialAuthentication() {

    // authenticate google user (only) when initiating service
    gauth.authenticate(scopes);
}

async function mapRequest(input, msgInstance) {

    // Process and validate input
    let deserialized = input.split(' ');
    let command = deserialized[0].substring(1);
    deserialized.shift();
    let keyword = combineKeywords(deserialized);

    if (commandWithKeyword.includes(command) == true && keyword.length == 0) {
        return msgInstance.reply(`You don't specify the keyword, dumbass`);
    }

    // Map commands with corresponding actions
    if (command == 'p' || command == 'play') {
        ytservice.getTopVideo(gauth.oauth2Client, keyword)
            .then(videoUrl => {
                return msgInstance.channel.send({ embeds: [discordEmbeds.playEmbed(videoUrl)] });
            })
            .catch(console.error);
    } else if (command == 's' || command == 'search') {
        ytservice.searchVideo(gauth.oauth2Client, keyword)
            .then(videoTitles => {
                return msgInstance.channel.send({ embeds: [discordEmbeds.searchEmbed(formatHyperlink(videoTitles))] });
            })
            .catch(console.error);
    } else if (command == 'stop') {
        return msgInstance.reply(`Please stop the music!`);
    } else {
        return msgInstance.reply(`Your command is not registered`);
    }
}

function combineKeywords(wordArray) {

    // Combining search/play keywords
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

function formatHyperlink(hash) {

    // Change {title : url} hash into [title](url) string a la markdown
    let videoArray = Array.from(hash);
    array = [];
    videoArray.forEach(item => {
        array.push(`[${item[0]}](${item[1]})`);
    });
    console.log(array);

    result = '';
    for (i = 0; i < array.length; i++) {
        result += array[i];
        if (array[i] == array.length - 1) {
            break;
        }
        result += '\n';
    }
    return result;
}

module.exports = { mapRequest, initialAuthentication };