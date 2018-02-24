"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const log = require("fancy-log");
class Application {
    constructor() {
        if (Application.instance) {
            throw new Error("Error: Instantiation failed: Use Properties.getInstance() instead of new.");
        }
        Application.instance = this;
    }
    static getInstance() {
        return Application.instance;
    }
    getLogWebhookInstance() {
        if (!this.logWH) {
            this.logWH = new discord_js_1.WebhookClient(this.config.config.webhooks.logs.id, this.config.config.webhooks.logs.token);
        }
        return this.logWH;
    }
    setCommand(name, command) {
        this.commands.set(name, command);
    }
    getCommand(name) {
        return this.commands.get(name);
    }
    getCommands() {
        return this.commands;
    }
    registerCommands() {
        this.commands = new discord_js_1.Collection();
        fs_1.readdir(path_1.join(".", "./dist/Commands/"), (error, files) => {
            if (error) {
                log.error(error);
                throw error;
            }
            files.forEach((file) => {
                delete require.cache[require.resolve(`${path_1.resolve(".")}/dist/Commands/${file}`)];
                const commandFile = require(`${path_1.resolve(".")}/dist/Commands/${file}`);
                const commandName = file.split(".")[0];
                const commandClass = new commandFile[commandName]();
                log(`Registered command ${commandName}`);
                this.setCommand(commandName.toLowerCase(), commandClass);
            });
        });
    }
    async setupSchedules() {
        /*readdir(join(".", "./dist/Lib/Schedules/"), (error, files) => {
            if (error) {
                log.error(error);
                throw error;
            }
            if (this.schedules === undefined) {
                this.schedules = new Array();
            }

            files.forEach((file) => {
                delete require.cache[require.resolve(`${resolve(".")}/dist/Lib/Schedules/${file}`)];
                const scheduleFile = require(`${resolve(".")}/dist/Lib/Schedules/${file}`);
                const scheduleName = file.split(".")[0];

                if (this.schedules[scheduleName] !== undefined) {
                    this.schedules[scheduleName].cancel();
                }

                this.schedules[scheduleName] = scheduleFile[scheduleName].run();

                log(`Registered Schedule ${scheduleName}`);

            });*/
    }
    deleteCommand(name) {
        this.commands.delete(name);
    }
}
Application.instance = new Application();
exports.Application = Application;
