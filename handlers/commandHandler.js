const { Collection } = require("discord.js");
const { readdirSync } = require("node:fs");

module.exports = {
  execute: async (client) => {
    client.commandAliases = new Collection();
    client.commands = new Collection();
    client.slashCommands = new Collection();
    client.slashDatas = [];

    const commandFolders = readdirSync("./commands");

    for (const category of commandFolders) {
      const commandFiles = readdirSync(`./commands/${category}`);

      for (const file of commandFiles) {
        const commands = require(`../commands/${category}/${file}`);

        if (commands) {
          if (commands.prefix) {
            const prefixCommand = commands.prefix;
            client.commands.set(prefixCommand.name, prefixCommand);

            if (Array.isArray(prefixCommand.aliases)) {
              prefixCommand.aliases.forEach((alias) => {
                client.commandAliases.set(alias, prefixCommand.name);
              });
            }
          }

          if (commands.slash) {
            const slashCommand = commands.slash;
            client.slashDatas.push(slashCommand.data.toJSON());
            client.slashCommands.set(slashCommand.data.name, slashCommand);
          }
        }
      }
    }
  },
};
