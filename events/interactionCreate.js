const { Collection, Events, InteractionType } = require("discord.js");
const cooldown = new Collection();
const config = require("../config.js");

module.exports = {
  name: Events.InteractionCreate,

  execute: async (interaction) => {
    const client = interaction.client;

    if (interaction.type === InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;

      try {
        const command = client.slashCommands.get(interaction.commandName);

        if (command.ownerOnly && interaction.user.id !== config.owner)
          return interaction.reply({
            content: "Only the owner can use this command.",
            ephemeral: true,
          });

        if (command.cooldown) {
          if (cooldown.has(`${command.name}-${interaction.user.id}`)) {
            const nowDate = interaction.createdTimestamp;
            const waitedDate = cooldown.get(`${command.name}-${interaction.user.id}`) - nowDate;

            interaction.reply({
              content: `Cooldown is now active, please try again in <t:${Math.floor(
                new Date(nowDate + waitedDate).getTime() / 1000
              )}:R>.`,
              ephemeral: true,
            }).then((msg) =>
              setTimeout(() => msg.delete(), cooldown.get(`${command.name}-${interaction.user.id}`) - Date.now() + 1000)
            );
          }

          command.run(client, interaction);

          cooldown.set(`${command.name}-${interaction.user.id}`, Date.now() + command.cooldown);

          setTimeout(() => {
            cooldown.delete(`${command.name}-${interaction.user.id}`);
          }, command.cooldown + 1000);
        } else {
          command.run(client, interaction);
        }
      } catch (e) {
        console.error(e);
        interaction.reply({
          content: "Problem while running command! Please try again.",
          ephemeral: true,
        });
      }
    }
  },
};
