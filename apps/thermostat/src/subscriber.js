import { client } from "./main.js";

/**
 * Subscribes to a given topic and prints the received messages to the console.
 * @param {string} topic The topic to subscribe to.
 * @returns {void}
 */
function pollTemperature(topic) {
    client.subscribe(topic);
    client.on("message", message => {
        // eslint-disable-next-line no-console -- This projekt is a CLI application
        console.log(`${topic}: ${message.toString()}`);
    });
}

export { pollTemperature };
