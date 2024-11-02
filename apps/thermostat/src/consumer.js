import { CLIENT, ROOM } from "./main.js";

const suffix = "-control";

/**
 * Subscribes to a given topic and prints the received messages to the console.
 * @author Philip Neuffer
 * @param {string} topic The topic to subscribe to.
 * @returns {void}
 */
function pollTemperature(topic) {
    CLIENT.subscribe(topic);
    CLIENT.subscribe(`topic${suffix}`);
    CLIENT.on("message", (receivedTopic, receivedMessage) => {
        if (receivedTopic === topic) {
            // eslint-disable-next-line no-console -- this is a CLI application
            console.log(
                `The temperature in the ${ROOM} is ${receivedMessage.toString()}°C.`
            );
        } else if (receivedTopic === `topic${suffix}`) {
            // eslint-disable-next-line no-console -- this is a CLI application
            console.log(
                `Received message on topic ${receivedTopic}: ${receivedMessage.toString()}`
            );
        }
    });
}

export { pollTemperature };
