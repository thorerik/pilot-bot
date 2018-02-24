"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const EventBase_1 = require("../Lib/EventBase");
const LogError_1 = require("../Lib/LogError");
class NewGuild extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "guildCreate";
        this.logger = new LogError_1.LogError();
    }
    async run(guild) {
        // tslint:disable-next-line:max-line-length
        log(`New guild: ${guild.name}, owned by ${guild.owner.user.username}#${guild.owner.user.discriminator} with ${guild.memberCount} members`);
    }
}
exports.NewGuild = NewGuild;
