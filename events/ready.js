module.exports = async (client) => {
  client.Ready = true, 
  client.user.setPresence({
    status: "online",  //online, idle, or dnd
    activity: {
        name: "Music",  
        type: "LISTENING", // PLAYING, WATCHING, LISTENING, STREAMING,
    }
});
    client.Manager.init(client.user.id);
    client.log("Successfully Logged in as " + client.user.tag); 
client.RegisterSlashCommands();
};

