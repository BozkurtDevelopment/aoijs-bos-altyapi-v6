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

const { AoiClient, Util } = require('aoi.js');
const { Handler, Functions } = require('aoi.tools')
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

const { Handler } = require('aoi.tools')

const handler = new Handler(client)
.loadCommands('./commands', { main: "$onlyIf[$getGlobalUserVar[blacklisted;$authorID]==false;You are blacklisted!]" })
.loadVariables('./variables')
.loadStatus('./status')
.loadFunctions('./functions');
