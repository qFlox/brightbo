const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const prefix = {
  name: "github",
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, message, args) => {
    const embed = new EmbedBuilder()
      .setTitle("Github Page")
      .setURL("https://github.com/qFlox/brightbo")
      .setDescription("> Go check out my source code at my Github page\n> by clicking on the title!\n\n**There you can find:**\n - How to host me for free.\n - How to set me up.\n - How to contribute to my code.\n\n**How to delete this**\nIf you don't want this command in your\nbot then delete it here:\n``../commands/utility/github.js``")
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
      .setTitle("Github Page")
      .setURL("https://github.com/qFlox/brightbo")
      .setDescription("> Go check out my source code at my Github page\n> by clicking on the title!\n\n**There you can find:**\n - How to host me for free.\n - How to set me up.\n - How to contribute to my code.\n\n**How to delete this**\nIf you don't want this command in your\nbot then delete it here:\n``../commands/utility/github.js``")
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
