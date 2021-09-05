const DiscordMusicBot = require("./structures/DiscordMusicBot");
const client = new DiscordMusicBot();
const keepAlive = require("./server.js")

keepAlive();
client.build();

module.exports = client; //;-;
