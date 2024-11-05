/**
 * Control module for managing smart devices in a home.
 * Using integration technique message exchange via MQTT.
 * Control acts as consumer and producer for messages.
 * @module control
 * @requires CLIENT
 * @exports start
 * @author Felix Jaeger
 */
import { CLIENT } from "./main.js";

/**
 * Handles the registration messages.
 * @returns {void}
 */
function messageHandler() {
    CLIENT.on("message", (receivedTopic, receivedMessage) => {
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`received message on topic ${receivedTopic.toString()}: ${receivedMessage.toString()}`);
        const room = receivedMessage.toString().split(":")[0];
        const temperature = receivedMessage.toString().split(":")[1];

        // check if temperature is too low. if yes, turn on heating.
        if (temperature < 18) {
            // eslint-disable-next-line no-console -- message to console
            console.info(`room ${room} is too cold (<18°C). turning on heating.`);
            CLIENT.publish("thermostat", `${room}:23`, { qos: 1 }); // qos 1 to ensure reliablity.
        }
    });
}

/**
 * Status whether control has already been started.
 * @type {boolean}
 */
let isStarted = false;

/**
 * Starts the control.
 * @returns {void}
 */
export function start() {

    // Check if control is already started to prevent multiple starts.
    if (isStarted) {
        return;
    }
    isStarted = true;
    // eslint-disable-next-line no-console -- message to console
    console.info("control started.");
    CLIENT.subscribe("temperatursensor", { qos: 1 }); // qos 1 to ensure reliablity.
    messageHandler();
}
