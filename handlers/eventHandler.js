const { readdirSync } = require("node:fs");

module.exports = {
  execute: async (client) => {
    const eventFiles = readdirSync("./events");

    for (const file of eventFiles) {
      const event = require(`../events/${file}`);

      if (event.once) {
        client.once(event.name, event.execute);
      } else {
        client.on(event.name, event.execute);
      }
    }

    process.on("unhandledRejection", console.log);
    process.on("uncaughtException", console.log);
    process.on("uncaughtExceptionMonitor", console.log);
  },
};
