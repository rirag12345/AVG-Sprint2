import { CLIENT } from "./main.js";

/**
 * Subscribes to a given topic and prints the received messages to the console.
 * @author Philip Neuffer
 * @param {string} topic The topic to subscribe to.
 * @returns {void}
 */
function pollTemperature(topic) {
    CLIENT.subscribe(topic);
    CLIENT.on("message", (receivedTopic, receivedMessage) => {
        // eslint-disable-next-line no-console -- This project is only run from the console
        console.log(`${receivedTopic}: ${receivedMessage.toString()}`);
    });
}

export { pollTemperature };
