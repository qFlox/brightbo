const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { readdirSync } = require("fs");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  shards: "auto"
});

const config = require("./config.js");
const token = config.token;

const handlerFiles = readdirSync("./handlers").filter(file => file.endsWith(".js"));
for (const file of handlerFiles) {
  const util = require(`./handlers/${file}`);
  util.execute(client);
}

client.login(token);
