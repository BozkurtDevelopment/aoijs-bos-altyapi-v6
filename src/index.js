/*
-------------------------------------------
          © Copyright 2023
          Bozkurt Development
-------------------------------------------
*/

const config = {
  token: "TOKEN",
  prefix: ["PREFIX"],
  dbpasscode: "DB_PASS_CODE"
}
const { token, prefix, dbpasscode } = config; 

const { AoiClient, Util } = require("aoi.js");
const { setup } = require('@akarui/aoi.parser')
const database = require('@akarui/aoi.db')
const loader = require('./classes/loader')
setup(Util);

const client = new AoiClient({
    token: token,
    prefix: prefix,
    intents: ["MessageContent", "Guilds", "GuildMessages", "GuildMembers"],
    events: [
      "onMessage",
      "onInteractionCreate",
      "onJoin",
      "onLeave",
      "onMessageDelete",
    ],
    respondToBots: false,
    guildOnly: true,
    disableFunctions: ["$clientToken"],
    database: {
      type: "aoi.db",
      db: database,
      tables: ["main", "other"],
      path: "./database/",
      extraOptions: {
        dbType: "KeyValue",
        securityKey: dbpasscode
      }
    }
  })

// LOADERS
client.loadCommands('./src/commands', true)
client.loadCommands('./src/events', true)
loader.loadStatus(client)
loader.loadFunctions(client)
loader.loadVariables(client)