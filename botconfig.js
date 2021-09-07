module.exports = {
  Admins: ["589773984447463434"], 
  ExpressServer: false,//website run or not
  DefaultPrefix: process.env.Prefix || "!n ", //Default prefix
  Port: 3000, //port of website
  SupportServer: "https://discord.gg/DDshy3AHnX", 
  Token: process.env.Token ||  process.env['TOKEN'], 
  ClientID: process.env.Discord_ClientID || process.env['CLIENTID'], 
  ClientSecret: process.env.Discord_ClientSecret || process.env['CLIENTSECRET'], 
  Scopes: ["identify", "guilds", "applications.commands"], 
  CallbackURL: "/api/callback", 
  "24/7": true, 
  CookieSecret: "Pikachu is cute", 
  IconURL:
    "https://i.imgur.com/pqerUy7.gif", //URL of all embed author icon
  Permissions: 2205280576, 
  Website: process.env.Website || "http://localhost", //Website where it was hosted

  //Lavalink
   Lavalink: {
    id: "Main",
    host: "lava.link",
    port: 80,
    pass: "youshallnotpass", 
    secure: false, 
  },
  

  //https://developer.spotify.com/dashboard/ (Not needed)
  Spotify: {
    ClientID: process.env.Spotify_ClientID || "", //Spotify Client ID
    ClientSecret: process.env.Spotify_ClientSecret || "", //Spotify Client Secret
  },
};