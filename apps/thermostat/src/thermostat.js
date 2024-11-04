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
 * @param {string} room The room of the thermostat.
 * @returns {void}
 */
function pollTemperature(room) {
    // eslint-disable-next-line no-console -- message to console
    console.info("temperature sensor started.");
    CLIENT.subscribe("thermostat");
    CLIENT.on("message", (_, receivedMessage) => {
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`received message: ${receivedMessage.toString()}`);

        // regular expression for the message from the control. also checks for the correct room.
        const regex = new RegExp(`^${room}:(0[0-9]|[12][0-9]|30)$`, "u");

        // check if message is a valid command.
        if (regex.test(receivedMessage.toString())) {
            const temperature = receivedMessage.toString().split(":")[1];

            // eslint-disable-next-line no-console -- debug message to console
            console.debug(`received the command from the control to set the temparature of the heating to ${temperature}°C.`);
        }
    });
}

/**
 * Starts the thermostat.
 * @param {string} room The room of the thermostat.
 * @returns {void}
 */
export function start(room) {
    // eslint-disable-next-line no-console -- message to console
    console.info("thermostat started.");
    pollTemperature(room);
}
