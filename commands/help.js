const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists all of my commands :)',
    aliases: ['commands'],
    usage: ['command name'],
    cooldown: 3,
    execute(message, args) {
        const { commands } = message.client;

        if (!args.length) {
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle('Here is a list of my commands :)')
                .setDescription(commands.map(command => command.name).join('\n '))
                .setFooter('BrightBo');

            return message.channel.send(embed);
        }
    },
};
