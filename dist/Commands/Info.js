"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Application_1 = require("../Lib/Application");
class Info {
    constructor() {
        this.help = "Gets you some information about the bot";
        this.examples = [
            "info",
        ];
        this.permissionRequired = discord_js_1.Permissions.FLAGS.SEND_MESSAGES;
        this.App = Application_1.Application.getInstance();
    }
    async run(message, args) {
        const version = require("../../package.json").version;
        const embed = new discord_js_1.MessageEmbed();
        embed.color = discord_js_1.Util.resolveColor([0, 255, 255]);
        embed.thumbnail = { url: "https://i.imgur.com/GA1uinv.png" };
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
        message.channel.send({ embed });
    }
}
exports.Info = Info;
