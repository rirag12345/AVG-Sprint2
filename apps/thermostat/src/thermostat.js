/**
 * Thermostat module for controlling the temperature of the heating of a room
 * by reacting to commands from the control to set the heating to a specific temperature.
 * Using integration technique message exchange via MQTT.
 * Thermostat acts as consumer for messages.
 * @module thermostat
 * @requires CLIENT
 * @exports start
 * @author Philip Neuffer
 * @author Felix Jaeger
 */
import { CLIENT } from "./main.js";

/**
 * Reacting to messages from the control in the thermostat topic.
 * Validating if message contains a command to set the temperature of the heating.
 * @param {string} room The room of the thermostat.
 * @returns {void}
 */
function pollTemperature(room) {
    CLIENT.on("message", (_, receivedMessage) => {

        // regular expression for the message from the control. also checks for the correct room.
        const regex = new RegExp(`^${room}:(0[0-9]|[12][0-9]|30)$`, "u");

        // check if message is a valid command.
        if (regex.test(receivedMessage.toString())) {
            const temperature = receivedMessage.toString().split(":")[1];

            // eslint-disable-next-line no-console -- message to console
            console.info(`set temperature of the heating to ${temperature}°C.`);
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
    CLIENT.subscribe("thermostat");
    pollTemperature(room);
}
