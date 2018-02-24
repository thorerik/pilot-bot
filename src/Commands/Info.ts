import { Message, MessageEmbed, Permissions, Util } from "discord.js";

import * as log from "fancy-log";

import { Command } from "../Lib/Command";
import { Application } from "../Lib/Application";

export class Info implements Command {
    public help = "Gets you some information about the bot";
    public examples = [
        "info",
    ];
    public permissionRequired = Permissions.FLAGS.SEND_MESSAGES;
    private App = Application.getInstance();

    public async run(message: Message, args: string[]) {
        const version = require("../../package.json").version;

        const embed = new MessageEmbed();

        embed.color = Util.resolveColor([0, 255, 255]);

        embed.thumbnail = {url: "https://i.imgur.com/GA1uinv.png"};

        embed.title = "About Pilot bot";

        embed.author = {
            iconURL: "https://i.imgur.com/GA1uinv.png",
            name: "Pilot bot",
        };

        embed.footer = {
            text: "Created by Tuxy Fluffyclaws#1337",
        };

        embed.addField("Version", version);
        embed.addField("Author", "Tuxy Fluffyclaws#1337", true);
        embed.addField("Guilds", this.App.client.guilds.size, true);
        embed.addField("Users", this.App.client.users.size, true);

        message.channel.send({embed});
    }
}
