import * as log from "fancy-log";

import { EventBase } from "../Lib/EventBase";
import { Application } from "../Lib/Application";

export class Ready extends EventBase {
    public subscribe = "ready";
    constructor() {
        super();
    }
    public run() {
        log(
            `${
                this.App.client.user.username
            } - (${
                this.App.client.user.id
            }) on ${
                this.App.client.guilds.size.toString()
            } guilds with ${
                this.App.client.channels.size.toString()
            } channels`,
        );
        const App = Application.getInstance();
        App.setupSchedules();
    }
}
