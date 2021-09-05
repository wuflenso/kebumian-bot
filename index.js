/*
 * First Layer: Entry point of the KebumianBot
 */

require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const usecase = require('./app/usecase.js');

// KebumianBot initiation event handler
client.on('ready', async () => {
  usecase.initialAuthentication().then(
    console.log(`Logged in as ${client.user.tag}!`))
    .catch(console.error);
});

// User message event handler
client.on('message', msg => {
  if (msg.content[0] == '-' && msg.content.length > 1) {
    usecase.mapRequest(msg.content, msg);
  }
});

// Login bot using discord token
client.login(process.env.CLIENT_TOKEN);