import { Message } from "discord.js";
import * as log from "fancy-log";

import { EventBase } from "../Lib/EventBase";

export class CommandProcessor extends EventBase {
    private args: string[];
    private message: Message;
    constructor() {
        super();
    }
    public async run(message: Message) {
        this.message = message;

        if (this.message.guild === null) {
            return;
        }
        

        if (!this.message.content.startsWith(this.App.config.config.prefix)) { return; }

        this.args = this.message.content.split(/\s+/g);
        let command = this.args.shift().toLowerCase();
        command = command.split(this.App.config.config.prefix)[1];
        this.runCommand(command);
    }

    private runCommand(command: string) {
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
            } else {
                this.message.reply(`Sorry, you do not have permission for this command`);
            }
        } catch (e) {
            // We don't really care for errors here
        }
    }
}
