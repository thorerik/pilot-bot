import { readdir } from "fs";
import { join, resolve } from "path";

import { Client, Collection, WebhookClient } from "discord.js";

import * as log from "fancy-log";

import { Command } from "./Command";
import { Config } from "./Config";

export class Application {

    public static getInstance(): Application {
        return Application.instance;
    }

    private static instance: Application = new Application();

    public client: Client;

    public config: Config;
    private logWH: WebhookClient;
    private commands: Collection<string, Command>;
    private schedules: any[];

    constructor() {
        if (Application.instance) {
            throw new Error("Error: Instantiation failed: Use Properties.getInstance() instead of new.");
        }
        Application.instance = this;
    }

    public getLogWebhookInstance(): WebhookClient {
        if (!this.logWH) {
            this.logWH = new WebhookClient(this.config.config.webhooks.logs.id, this.config.config.webhooks.logs.token);
        }
        return this.logWH;
    }

    public setCommand(name: string, command: Command) {
        this.commands.set(name, command);
    }

    public getCommand(name: string): Command {
        return this.commands.get(name);
    }

    public getCommands(): Collection<string, Command> {
        return this.commands;
    }

    public registerCommands() {
        this.commands = new Collection<string, Command>();
        readdir(join(".", "./dist/Commands/"), (error, files) => {
            if (error) {
                log.error(error);
                throw error;
            }

            files.forEach((file) => {
                delete require.cache[require.resolve(`${resolve(".")}/dist/Commands/${file}`)];
                const commandFile = require(`${resolve(".")}/dist/Commands/${file}`);
                const commandName = file.split(".")[0];

                const commandClass = new commandFile[commandName]();

                log(`Registered command ${commandName}`);

                this.setCommand(commandName.toLowerCase(), commandClass);
            });
        });
    }

    public async setupSchedules() {
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

    private deleteCommand(name: string) {
        this.commands.delete(name);
    }
}
