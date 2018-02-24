import { Application } from "../Lib/Application";

export class EventBase {
    public subscribe = "message";

    protected App: Application;

    constructor() {
        this.App = Application.getInstance();
    }
}
