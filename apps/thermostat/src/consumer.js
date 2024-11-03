/**
 * Consumer module for subscribing to MQTT topics and handling messages.
 * @module consumer
 * @requires CLIENT
 * @exports pollTemperature
 * @author Philip Neuffer
 * @author Felix Jaeger
 */
import { CLIENT } from "./main.js";

/**
 * Subscribes to a given topic and prints the received messages to the console.
 * @author Philip Neuffer
 * @param {string} topic The topic to subscribe to.
 * @returns {void}
 */
export function pollTemperature(topic) {
    CLIENT.subscribe(topic);
    CLIENT.on("message", receivedMessage => {
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`The thermostat received the command from the control to set the temparature of the heating to: ${receivedMessage.toString()}°C.`);
    });
}
