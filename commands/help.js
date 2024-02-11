module.exports = {
    name: 'help',
    description: 'Lists all of my commands :)',
    aliases: ['commands'],
    usage: ['command name'],
    cooldown: 3,
    execute(message, args) {
        const data = [];
        const { commands } = message.client

        if (!args.length) {
            data.push('Here is a list of my commands :)');
            data.push(commands.map(coomand => commands.name).join(', '));
            data.push('\nYou can send \`${prefix}help [command name]\` to get info on a certain command.');

            return message.channel.send(data, { split: true });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Thats not a valid command.');
        }

        data.push('**Name:** ${command.name}');

        if (command.aliases) data.push('**Aliases:** ${command.aliases.join(', ')}');
        if (command.description) data.push('**Description:** ${command.description}');
        if (command.usage) data.push('**Usage:** ${prefix}${command.name} ${command.usage}');

        data.push('**Cooldown:** ${command.cooldown || 3} second(s)');

        message.hannel.send(data, { split: tue });
    },
};
