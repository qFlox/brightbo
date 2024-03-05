const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const prefix = {
  name: "kick",
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, message, args) => {
    if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return message.reply("You don't have permission to use this command.");
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply("Please mention a user to kick.");
    }

    const reason = args.slice(1).join(" ");
    if (!reason) {
      return message.reply("Please provide a reason for the kick.");
    }

    try {
      await message.guild.members.kick(user, { reason });
      const embed = new EmbedBuilder()
        .setTitle("Kicked user succesfully!")
        .setDescription(`${user.tag} has been kicked.`)
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
      return message.reply("An error occurred while kicking the user.");
    }
  },
};

const slash = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reason")
        .setDescription("The reason for the kick")
        .setRequired(true)
    ),
  cooldown: 5000,
  ownerOnly: false,
  run: async (client, interaction) => {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.reply("You don't have permission to use this command.");
    }

    const user = interaction.options.getUser("user");
    if (!user) {
      return interaction.reply("Please mention a user to kick.");
    }

    const reason = interaction.options.getString("reason");
    if (!reason) {
      return interaction.reply("Please provide a reason for the kick.");
    }

    try {
      await interaction.guild.members.kick(user, { reason });
      const embed = new EmbedBuilder()
        .setTitle("Kicked user succesfully!")
        .setDescription(`${user.tag} has been kicked.`)
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
      return interaction.reply("An error occurred while kicking the user.");
    }
  },
};

module.exports = {slash, prefix};
