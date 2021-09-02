// Entry point of the app

require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const logic = require('./usecase.js');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content[0] == '-' && msg.content.length>1) {
    msg.reply(logic.mapRequest(msg.content));
  }
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token