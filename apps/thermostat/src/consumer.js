/**
 * Consumer module for subscribing to MQTT topics and handling messages.
 * @module consumer
 * @requires mqtt
 * @exports pollTemperature
 * @author Philip Neuffer
 */
import { CLIENT, room } from "./main.js";

/**
 * Subscribes to a given topic and prints the received messages to the console.
 * @author Philip Neuffer
 * @param {string} topic The topic to subscribe to.
 * @returns {void}
 */
export function pollTemperature(topic) {
    CLIENT.subscribe(topic);
    CLIENT.on("message", (receivedTopic, receivedMessage) => {
        // eslint-disable-next-line no-console -- this is a CLI application
        console.log(
            `The thermostate received the command from the control to set the temparature of the heating to: ${receivedMessage.toString()}°C.`
        );
    });
}
