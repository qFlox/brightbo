module.exports = {
    name: 'ping',
    description: 'Replys with pong!',
    execute(message, args) {
        message.channel.send('Pong.');
    },
};
