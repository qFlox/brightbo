const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const activities = [
    { name: 'your server', type: 'WATCHING' },
    { name: 'to you', type: 'LISTENING' },
    { name: 'with code', type: 'PLAYING' }
];
let i = 0;

client.once('ready', () => {
    console.log('Bot is online!');
    setInterval(() => {
        client.user.setActivity(activities[i].name, { type: activities[i].type });
        i = (i + 1) % activities.length;
    }, 15 * 1000); // change 15 to the amount of seconds between activity change or leave the same.
});

client.on('message', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return; // Set prefix in config.json

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error executing that command!');
    }
});

client.login(config.token); // Set token in config.json
