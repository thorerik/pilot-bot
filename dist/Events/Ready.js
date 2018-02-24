"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("fancy-log");
const EventBase_1 = require("../Lib/EventBase");
const Application_1 = require("../Lib/Application");
class Ready extends EventBase_1.EventBase {
    constructor() {
        super();
        this.subscribe = "ready";
    }
    run() {
        log(`${this.App.client.user.username} - (${this.App.client.user.id}) on ${this.App.client.guilds.size.toString()} guilds with ${this.App.client.channels.size.toString()} channels`);
        const App = Application_1.Application.getInstance();
        App.setupSchedules();
    }
}
exports.Ready = Ready;
