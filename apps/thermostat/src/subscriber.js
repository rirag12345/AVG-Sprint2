import { client } from "./main.js";

function pollTemperature(topic) {
    client.subscribe(topic);
    client.on("message", (topic, message) => {
        console.log(
            `${topic}: ${message.toString()}`
        );
    });
}

export { pollTemperature };
