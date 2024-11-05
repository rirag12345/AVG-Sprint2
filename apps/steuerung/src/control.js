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
 * Handles the incoming messages from all temperature sensors.
 * @returns {void}
 */
function messageHandler() {
    CLIENT.on("message", (receivedTopic, receivedMessage) => {
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`received message on topic ${receivedTopic.toString()}: ${receivedMessage.toString()}`);
        const room = receivedMessage.toString().split(":")[0];
        const temperature = receivedMessage.toString().split(":")[1];

        // check if temperature is too low. if yes, turn up heating.
        if (temperature < 19) {
            // eslint-disable-next-line no-console -- message to console
            console.info(`room ${room} is too cold (<19°C). turning up heating.`);
            CLIENT.publish("thermostat", `${room}:23`);
        }

        // check if temperature is high enough. if yes, turn down heating.
        if (temperature >= 23) {
            // eslint-disable-next-line no-console -- message to console
            console.info(`room ${room} is warm enough (>=23°C). turning down heating.`);
            CLIENT.publish("thermostat", `${room}:19`);
        }
    });
}

/**
 * Starts the control.
 * @returns {void}
 */
export function start() {
    // eslint-disable-next-line no-console -- message to console
    console.info("control started.");
    CLIENT.subscribe("temperatursensor");
    messageHandler();
}
