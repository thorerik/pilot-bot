"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EventBase_1 = require("../Lib/EventBase");
class CommandProcessor extends EventBase_1.EventBase {
    constructor() {
        super();
    }
    async run(message) {
        this.message = message;
        if (this.message.guild === null) {
            return;
        }
        if (!this.message.content.startsWith(this.App.config.config.prefix)) {
            return;
        }
        this.args = this.message.content.split(/\s+/g);
        let command = this.args.shift().toLowerCase();
        command = command.split(this.App.config.config.prefix)[1];
        this.runCommand(command);
    }
    runCommand(command) {
        try {
            const cmd = this.App.getCommand(command);
            if (
            // User has permission
            (typeof cmd.permissionRequired !== "string" &&
                this.message.member.hasPermission(cmd.permissionRequired)) ||
                // User is owner
                (typeof cmd.permissionRequired === "string" &&
                    cmd.permissionRequired === "BOT_OWNER" &&
                    this.App.config.config.owners.includes(this.message.member.id))) {
                cmd.run(this.message, this.args);
            }
            else {
                this.message.reply(`Sorry, you do not have permission for this command`);
            }
        }
        catch (e) {
            // We don't really care for errors here
        }
    }
}
exports.CommandProcessor = CommandProcessor;
