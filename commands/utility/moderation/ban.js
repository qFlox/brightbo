const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const prefix = {
  name: "ban",
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("You don't have permission to use this command.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("Please mention a user to ban.");
    }

    const reason = args.slice(1).join(" ");
    if (!reason) {
      return message.reply("Please provide a reason for the ban.");
    }

    try {
      await message.guild.members.ban(user, { reason });
      const embed = new EmbedBuilder()
        .setTitle("Banned user successfully!")
        .setDescription(`${user.tag} has been banned.`)
        .addFields([
          {
            name: "Reason",
            value: reason,
            inline: true,
          },
          {
            name: "Moderator",
            value: message.author.tag,
            inline: true,
          },
        ])
        .setColor("#5B21B6");
      message.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return message.reply("An error occurred while banning the user.");
    }
  },
};

const slash = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to ban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the ban")
        .setRequired(true)
    ),
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply("You don't have permission to use this command.");
    }

    const user = interaction.options.getUser("user");
    if (!user) {
      return interaction.reply("Please mention a user to ban.");
    }

    const reason = interaction.options.getString("reason");
    if (!reason) {
      return interaction.reply("Please provide a reason for the ban.");
    }

    try {
      await interaction.guild.members.ban(user, { reason });
      const embed = new EmbedBuilder()
        .setTitle("Banned user successfully!")
        .setDescription(`${user.tag} has been banned.`)
        .addFields([
          {
            name: "Reason",
            value: reason,
            inline: true,
          },
          {
            name: "Moderator",
            value: interaction.user.tag,
            inline: true,
          },
        ])
        .setColor("#5B21B6");
      interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error(error);
      return interaction.reply("An error occurred while banning the user.");
    }
  },
};

module.exports = {slash, prefix};
