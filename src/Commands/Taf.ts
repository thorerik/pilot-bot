/// type=""
import { Message, Permissions } from "discord.js";

import * as log from "fancy-log";
import * as snekfetch from "snekfetch";

import { Command } from "../Lib/Command";
import { Application } from "../Lib/Application";

import {TafData} from "TafData";

export class Taf implements Command {
    // tslint:disable-next-line:max-line-length
    public help = "Get TAF for <ICAO>";
    public examples = [
        "taf ENGM",
    ];

    private apiEndpoint = "https://avwx.rest/api/taf/";
    private apiOptions = "?options=translate,summary,speech,info";

    public permissionRequired = Permissions.FLAGS.SEND_MESSAGES;

    public async run(message: Message, args: string[]) {
        const App = Application.getInstance();
        
        const ICAO = args.shift();

        const data = await snekfetch.get(`${this.apiEndpoint}${ICAO}${this.apiOptions}`);
        const TAF: TafData = data.body;

        // Sort the response
        const sorted = TAF.Forecast.sort((a, b) => { return +a["End-Time"] - +b["End-Time"]});

        let reply = "```";
        reply += `TAF for ${ICAO}`;
        reply += "\n";

        sorted.forEach((forecast) => {
            reply += `From ${forecast["Start-Time"]} to ${forecast["End-Time"]}`;
            reply += "\n";
            reply += `${forecast.Summary}`;
            reply += "\n\n";
        });
        reply += "```";

        message.channel.send(reply);
    }
}
