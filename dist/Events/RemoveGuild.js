"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const EventBase_1 = require("../Lib/EventBase");
const LogError_1 = require("../Lib/LogError");
class RemoveGuild extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "guildDelete";
        this.logger = new LogError_1.LogError();
    }
    async run(guild) {
        log(`Guild gone: ${guild.name}, owned by ${guild.owner.user.username}#${guild.owner.user.discriminator}`);
    }
}
exports.RemoveGuild = RemoveGuild;
