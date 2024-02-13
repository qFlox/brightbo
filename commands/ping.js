const { EmbedBuilder } = require('discord.js');

module.exports = {
  data: { 
  name: 'ping', 
  description: 'Replies with Pong!', 
  aliases: ['latency'], 
//  defaultMemberPermissions: 'Administrator', 
  cooldown: 5000 
  },

execute(message, args) { 
  const embed = new EmbedBuilder() 
  .setColor('Random') 
  .setTitle('Pong!') 
  .setDescription('Ping: ${message.client.ws.ping}ms');

  message.channel.send({ embeds: [embed] });
  } 
};
