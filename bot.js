const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const config = require('./config.json');

client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
client.slashCommands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  if (command.slashCommand) {
    client.slashCommands.set(command.slashCommand.data.name, command.slashCommand);
  }
}

const activities = config.activities;
let currentActivity = 0;

client.once('ready', () => {
  console.log('Ready!');
  setInterval(() => {
    client.user.setActivity(activities[currentActivity]);
    currentActivity = (currentActivity + 1) % activities.length;
  }, 12000);

  client.guilds.cache.forEach(guild => {
    const rest = new REST({ version: '9' }).setToken(config.token);
    rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: client.slashCommands.map(c => c.data.toJSON()) })
      .then(() => console.log(`Slash commands registered for guild ${guild.name}`))
      .catch(console.error);
  });
});

client.on('guildCreate', guild => {
  const rest = new REST({ version: '9' }).setToken(config.token);
  rest.put(Routes.applicationGuildCommands(client.user.id, guild.id), { body: client.slashCommands.map(c => c.data.toJSON()) })
    .then(() => console.log(`Slash commands registered for guild ${guild.name}`))
    .catch(console.error);
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);

  if (!command) return;

  try {
    if (command.slashCommand) {
      await command.executeSlash(message, args);
    } else {
      await command.execute(message, args);
    }
  } catch (error) {
    console.error(error);
    message.reply('There was an error trying to execute that command!');
  }
});

client.login(config.token);
