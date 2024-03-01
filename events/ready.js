const { ActivityType, Events } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const activities = require("../config").activities;

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute: async (client) => {
    const rest = new REST({ version: "10" }).setToken(client.token);
    let index = 0;

    const updateActivity = () => {
      client.user.presence.set({
        activities: [{ name: activities.data[index], type: ActivityType.Listening }],
      });
      index = (index + 1) % activities.data.length;
    };

    updateActivity();
    setInterval(updateActivity, 30000);

    console.log(' ');
    console.info(' | ')
    console.info(' |       _                   _          ');
    console.info(' |      |_) ._ o  _  |_ _|_ |_)  _      ');
    console.info(' |      |_) |  | (_| | | |_ |_) (_)     ');
    console.info(' |                _|                    ');
    console.info(' | ');
    console.info(' |      Made by FireKrill and qFlux_    ');
    console.info(' |      Credit all the contributors.    ');
    console.info(' | ')
    console.info(' | Copyright (C) 2024  qFlux');
    console.info(' | This program comes with ABSOLUTELY NO WARRANTY; for details check LICENSE');
    console.info(' | This is free software, and you are welcome to redistribute it');
    console.info(' | under certain conditions; check LICENSE for details.');
    console.info(' | ')
    console.log(' ');
    console.log(' ');
    console.log(`[✓] Bot online`);

    try {
      await rest.put(Routes.applicationCommands(client.user.id), {
        body: client.slashDatas,
      });
      console.log('[✓] Slash commands successfully registered');
    } catch (error) {
      console.log(`[X] Error while registering slash commands`);
      console.error(error);
    }
  },
};
