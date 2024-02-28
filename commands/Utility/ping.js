const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const prefix = {
  name: "ping",
  aliases: ["pong"],
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, message, args) => {
    const embed = new EmbedBuilder()
      .setTitle("Pong!")
      .setDescription(`Ping: ${client.ws.ping}ms`)
      .setColor("#5B21B6");
    message.reply({ embeds: [embed] });
  }
};

const slash = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!"),
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("Pong!")
      .setDescription(`Ping: ${client.ws.ping}ms`)
      .setColor("#5B21B6");
    interaction.reply({ embeds: [embed] });
  }
};

module.exports = {slash, prefix};
