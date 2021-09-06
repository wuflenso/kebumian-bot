const { MessageEmbed } = require('discord.js');

function playEmbed(videoUrl){
    return playEmbed = new MessageEmbed()
                    .setTitle('Now Playing')
                    .setDescription(videoUrl)
                    .setTimestamp();
}

function searchEmbed(hyperlinks){
    return searchEmbed = new MessageEmbed()
                    .setTitle('Search Results')
                    .setDescription('Choose one of the following!')
                    .addFields(
                        { name: 'No.', value: '1\n2\n3\n4\n5', inline: true },
                        { name: 'Title', value: hyperlinks, inline: true }
                    )
                    .setTimestamp();
}

module.exports = { playEmbed, searchEmbed};