const { ChannelType, Collection, Events } = require("discord.js");
const config = require("../config.js");
const ms = require("ms");
const cooldown = new Collection();

module.exports = {
  name: Events.MessageCreate,
  execute: async (message) => {
    const client = message.client;

    if (message.author.bot || message.channel.type === ChannelType.DM) return;

    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.commandAliases.get(cmd));

    if (command && (!command.ownerOnly || message.author.id === config.owner)) {
      if (command.cooldown) {
        const commandName = command.name;
        const nowDate = message.createdTimestamp;
        const cooldownDuration = command.cooldown;

        if (cooldown.has(`${commandName}-${message.author.id}`)) {
          const waitedDate = cooldown.get(`${commandName}-${message.author.id}`) - nowDate;
          return message.reply({
            content: `Cooldown is now active, please try again in <t:${Math.floor(new Date(nowDate + waitedDate).getTime() / 1000)}:R>.`,
          }).then((msg) => setTimeout(() => msg.delete(), cooldownDuration - waitedDate + 1000));
        }

        command.run(client, message, args);
        cooldown.set(`${commandName}-${message.author.id}`, nowDate + cooldownDuration);

        setTimeout(() => {
          cooldown.delete(`${commandName}-${message.author.id}`);
        }, cooldownDuration);
      } else {
        command.run(client, message, args);
      }
    }
  },
};
