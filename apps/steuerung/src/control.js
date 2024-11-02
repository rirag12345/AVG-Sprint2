/**
 * Control module for managing smart devices.
 * Using integration technique message exchange via MQTT topics.
 * Control acts as consumer and producer for messages.
 * @module control
 * @requires client
 * @author Felix Jaeger
 */
import { CLIENT } from "./main.js";

/**
 * Starts the control.
 * @author Felix Jaeger
 * @returns {void}
 */
export function start() {
    // CLIENT.subscribe();
    CLIENT.on("message", (receivedTopic, receivedMessage) => {
        // TODO: Implement control logic.
    });
}
