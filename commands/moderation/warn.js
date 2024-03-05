const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Warning = require("../../database/warning");

const prefix = {
  name: "warn",
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, message, args) => {
    if (!message.member.permissions.has('MANAGE_MESSAGES')) {
      return message.reply('You do not have the required permissions to use this command.');
    }

    const userID = args[0];
    if (!userID) {
      return message.reply('Please specify a user to warn.');
    }

    const reason = args.slice(1).join(' ');
    if (!reason) {
      return message.reply('Please specify a reason for the warning.');
    }

    const warning = new Warning({
      userID,
      serverID: message.guild.id,
      moderatorID: message.author.id,
      reason
    });

    try {
      await warning.save();
      const embed = new EmbedBuilder()
        .setTitle('Warning Added')
        .setDescription(`A warning has been added to ${message.mentions.users.first() || client.users.cache.get(userID)}'s profile.`)
        .setColor('#5B21B6');
      message.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      message.reply('An error occurred while adding the warning.');
    }
  }
};

const slash = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Add a warning to a user's profile.")
    .addUserOption((option) => option.setName("user").setDescription("The user to warn.").setRequired(true))
    .addStringOption((option) => option.setName("reason").setDescription("The reason for the warning.").setRequired(true)),
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
      return interaction.reply({ content: 'You do not have the required permissions to use this command.', ephemeral: true });
    }

    const userID = interaction.options.getUser('user').id;
    const reason = interaction.options.getString('reason');

    const warning = new Warning({
      userID,
      serverID: interaction.guild.id,
      moderatorID: interaction.member.id,
      reason
    });

    try {
      await warning.save();
      const embed = new EmbedBuilder()
        .setTitle('Warning Added')
        .setDescription(`A warning has been added to ${interaction.options.getUser('user') || client.users.cache.get(userID)}'s profile.`)
        .setColor('#5B21B6');
      interaction.reply({ embeds: [embed] });
    } catch (err) {
      console.error(err);
      interaction.reply({ content: 'An error occurred while adding the warning.', ephemeral: true });
    }
  }
};

module.exports = {slash, prefix};
