const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Warning = require("../../database/warning");

const prefix = {
  name: "user-profile",
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, message, args) => {
    const userID = args[0];
    if (!userID) {
      return message.reply("Please specify a user to view their profile.");
    }

    const user = message.mentions.users.first() || client.users.cache.get(userID);
    if (!user) {
      return message.reply("Could not find the specified user.");
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply("That user is not in this server.");
    }

    const warnings = await Warning.find({ userID: user.id, serverID: message.guild.id }).exec();

    const embed = new EmbedBuilder()
      .setTitle(`User profile for ${user.tag}`)
      .setDescription(`**Discord Join Date:** ${user.createdAt.toLocaleString()}\n**Server Join Date:** ${member.joinedAt.toLocaleString()}`)
      .setColor('#5B21B6');

    if (warnings.length === 0) {
      embed.addFields({ name: 'Warnings', value: 'No warnings found.' });
    } else {
      embed.addFields({ name: 'Warnings', value: warnings.map((warning, index) => `**#${index + 1}** - Moderator: <@${warning.moderatorID}> - Reason: ${warning.reason}`).join('\n') });
    }

    message.reply({ embeds: [embed] });
  },
};

const slash = {
  data: new SlashCommandBuilder()
    .setName("user-profile")
    .setDescription("View a user's profile in this server.")
    .addUserOption((option) => option.setName("user").setDescription("The user to view their profile.").setRequired(true)),
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, interaction) => {
    const userID = interaction.options.getUser('user').id;

    const user = interaction.options.getUser('user');
    if (!user) {
      return interaction.reply({ content: 'Could not find the specified user.', ephemeral: true });
    }

    const member = interaction.guild.members.cache.get(user.id);
    if (!member) {
      return interaction.reply({ content: 'That user is not in this server.', ephemeral: true });
    }

    const warnings = await Warning.find({ userID: user.id, serverID: interaction.guild.id }).exec();

    const embed = new EmbedBuilder()
      .setTitle(`User profile for ${user.tag}`)
      .setDescription(`**Discord Join Date:** ${user.createdAt.toLocaleString()}\n**Server Join Date:** ${member.joinedAt.toLocaleString()}`)
      .setColor('#5B21B6');

    if (warnings.length === 0) {
      embed.addFields({ name: 'Warnings', value: 'No warnings found.' });
    } else {
      embed.addFields({ name: 'Warnings', value: warnings.map((warning, index) => `**#${index + 1}** - Moderator: <@${warning.moderatorID}> - Reason: ${warning.reason}`).join('\n') });
    }

    interaction.reply({ embeds: [embed] });
  },
};

module.exports = { slash, prefix };
