"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const log = require("fancy-log");
const Config_1 = require("./Lib/Config");
const Application_1 = require("./Lib/Application");
const App = Application_1.Application.getInstance();
App.config = new Config_1.Config("./config.json");
App.client = new discord_js_1.Client({
    disabledEvents: [
        "TYPING_START",
    ],
    sync: true,
});
// Register commands
App.registerCommands();
// Register events
fs_1.readdir(path_1.join(".", "./dist/Events/"), (error, files) => {
    if (error) {
        log.error(error);
        throw error;
    }
    files.forEach((file) => {
        const eventFile = require(`${path_1.resolve(".")}/dist/Events/${file}`);
        const eventName = file.split(".")[0];
        const eventClass = new eventFile[eventName]();
        log(`Registered event ${eventName} on ${eventClass.subscribe}`);
        App.client.on(eventClass.subscribe, (...args) => eventClass.run(...args));
    });
});
App.client.login(App.config.config.token).catch((err) => {
    log.error(err);
    throw err;
});
