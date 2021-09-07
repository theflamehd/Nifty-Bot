const { DiscordMusicBot } = require('../structures/DiscordMusicBot');
const { VoiceState, MessageEmbed} = require("discord.js");

module.exports = async (client, oldState, newState) => {

    if (newState.member.user.bot) return;

   
    let guildId = newState.guild.id;
    const player = client.Manager.get(guildId);

    // check if the bot is active
    if (!player || player.state !== "CONNECTED") return;

   
    const stateChange = {};
    
    if (oldState.channel === null && newState.channel !== null) stateChange.type = "JOIN";
    if (oldState.channel !== null && newState.channel === null) stateChange.type = "LEAVE";
    if (oldState.channel !== null && newState.channel !== null) stateChange.type = "MOVE";
    if (oldState.channel === null && newState.channel === null) return; // you never know, right

    // move check
    if (stateChange.type === "MOVE") {
        if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
        if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
    }
   
    if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
    if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;

    // check if the bot's voice channel is involved
    if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel) return;

    stateChange.members = stateChange.channel.members.filter(member => !member.user.bot);

    switch (stateChange.type) {
        case "JOIN":
            if (stateChange.members.size === 1 && player.paused) {
                let emb = new MessageEmbed()
                    .setAuthor(`Resuming paused queue`, client.botconfig.IconURL)
                    .setColor("RANDOM")
                    .setDescription(`Resuming playback because you left me with music to play when all of you just left me all alone`);
                await client.channels.cache.get(player.textChannel).send(emb);

                // update the now playing message
                let msg2 = await client.channels.cache.get(player.textChannel).send(player.nowPlayingMessage.embeds[0])
                player.setNowplayingMessage(msg2);

                player.pause(false);
            }
            break;
        case "LEAVE":
            if (stateChange.members.size === 0 && !player.paused && player.playing) {
                player.pause(true);

                let emb = new MessageEmbed()
                    .setAuthor(`Paused!`, client.botconfig.IconURL)
                    .setColor("RANDOM")
                    .setDescription(`The player has been paused because everybody left`);
                await client.channels.cache.get(player.textChannel).send(emb);
            }
            break;
    }
}
