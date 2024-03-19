const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const prefix = {
  name: "Help",
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, message, args) => {
    const embed = new EmbedBuilder()
      .setTitle("Help Page")
      .setURL("https://github.com/qFlox/brightbo")
      .setDescription("Coming Soon with some cool features :D")
      .setColor("#da8aff")
      .setFooter({
       text: "BrightBo",
       iconURL: "https://i.imgur.com/a1HYlH5.png",
  })
  .setTimestamp();

    await message.reply({ embeds: [embed] });
  }
};

const slash = {
  data: new SlashCommandBuilder()
    .setName("github")
    .setDescription("Credits to the bots github page!!"),
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, interaction) => {

    const embed = new EmbedBuilder()
      .setTitle("Help Page")
      .setURL("https://github.com/qFlox/brightbo")
      .setDescription("Coming Soon with some cool features :D")
      .setColor("#da8aff")
      .setFooter({
       text: "BrightBo",
       iconURL: "https://i.imgur.com/a1HYlH5.png",
  })
  .setTimestamp();

    await message.reply({ embeds: [embed] });
  }
};

module.exports = {slash, prefix};
