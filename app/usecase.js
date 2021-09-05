// Second Layer: Input processing and validations belong here

const { MessageEmbed } = require('discord.js');
const ytservice = require('./youtube-api-service.js');
const gauth = require('./google-oauth2.js');

const COMMAND_WITH_KEYWORD = ['play', 'p', 'search', 's'];
const scopes = ['https://www.googleapis.com/auth/youtubepartner'];

async function initialAuthentication() {
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
                const playEmbed = new MessageEmbed()
                    .setTitle('Now Playing')
                    .setDescription(videoUrl)
                    .setTimestamp();
                return msgInstance.channel.send({ embeds: [playEmbed] });
            })
            .catch(console.error);
    } else if (command == 's' || command == 'search') {
        ytservice.searchVideo(gauth.oauth2Client, keyword)
            .then(videoTitles => {
                const searchEmbed = new MessageEmbed()
                    .setTitle('Search Results')
                    .setDescription(formatHyperlink(videoTitles))
                    .setTimestamp();
                return msgInstance.channel.send({ embeds: [searchEmbed] });
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

function formatHyperlink(hash) {

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
        result += ', ';
    }
    return result;
}

module.exports = { mapRequest, initialAuthentication };