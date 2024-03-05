const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const prefix = {
  name: "unban",
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return message.reply("You don't have permission to use this command.");
    }

    const userId = args[0];
    if (!userId) {
      return message.reply("Please provide a user ID to unban.");
    }

    const reason = args.slice(1).join(" ");
    if (!reason) {
      return message.reply("Please provide a reason for the unban.");
    }

    try {
      await message.guild.members.unban(userId, reason);
      const embed = new EmbedBuilder()
        .setTitle("User unbanned successfully!")
        .setDescription(`<@${userId}> has been unbanned.`)
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
      return message.reply("An error occurred while unbanning the user.");
    }
  },
};

const slash = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Unban a user")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("The user ID to unban")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the unban")
        .setRequired(true)
    ),
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.reply("You don't have permission to use this command.");
    }

    const userId = interaction.options.getString("user");
    if (!userId) {
      return interaction.reply("Please provide a user ID to unban.");
    }

    const reason = interaction.options.getString("reason");
    if (!reason) {
      return interaction.reply("Please provide a reason for the unban.");
    }

    try {
      await interaction.guild.members.unban(userId, reason);
      const embed = new EmbedBuilder()
        .setTitle("User unbanned successfully!")
        .setDescription(`<@${userId}> has been unbanned.`)
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
      return interaction.reply("An error occurred while unbanning the user.");
    }
  },
};

module.exports = {slash, prefix};
