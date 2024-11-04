/**
 * Thermostat module for reacting to commands from the control to set the heating to a specific temperature
 * Using integration technique message exchange via MQTT.
 * Sensor acts as producer for messages.
 * @module thermostat
 * @requires CLIENT
 * @exports pollTemperature
 * @author Philip Neuffer
 * @author Felix Jaeger
 */
import { CLIENT } from "./main.js";

/**
 * Subscribes to a given topic and prints the received messages to the console.
 * @author Philip Neuffer
 * @param {string} room The room of the thermostat.
 * @returns {void}
 */
export function pollTemperature(room) {
    // eslint-disable-next-line no-console -- message to console
    console.info("temperature sensor started.");
    CLIENT.subscribe("thermostat");
    CLIENT.on("message", (_, receivedMessage) => {
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`received message: ${receivedMessage.toString()}`);
        if (receivedMessage.toString().includes(room)) {
            // eslint-disable-next-line no-console -- debug message to console
            console.debug(`The thermostat received the command from the control to set the temparature of the heating to ${receivedMessage.toString()}°C.`);
        }
    });
}
