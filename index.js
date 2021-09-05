// First Layer: Entry point of the KebumianBot

require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const usecase = require('./app/usecase.js');

const gauth = require('./app/google-oauth2.js');

client.on('ready', async () => {
  usecase.initialAuthentication().then(
    console.log(`Logged in as ${client.user.tag}!`))
    .catch(console.error);
});

client.on('message', msg => {
  if (msg.content[0] == '-' && msg.content.length > 1) {
    usecase.mapRequest(msg.content, msg);
  }

  if (msg.content == 't') {
    gauth.authenticate(scopes);
    msg.reply('received!');
  }
});

// login bot using token
client.login(process.env.CLIENT_TOKEN);