require('dotenv').config(); //initialize dotenv
const Discord = require('discord.js'); //import discord.js

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  };
  if (msg.content === 'soki') {
    msg.reply('adalah maskot dufan');
  }
  if (msg.content === 'rendy') {
    msg.reply('adalah maskot kemprat');
  }
});

//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token