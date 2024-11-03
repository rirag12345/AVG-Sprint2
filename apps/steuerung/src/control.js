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
 * The topics the control is managing.
 */
const topics = [];

/**
 * Handles the topics.
 * @returns {void}
 */
async function topicHandler() {
    CLIENT.on("packetsend", packet => {
        const receivedTopic = packet.topic;

        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`received packet on topic ${receivedTopic}`);
        if (!topics.includes(receivedTopic)) {
            topics.push(receivedTopic);
            CLIENT.subscribe(receivedTopic);
        }
    });
}

/**
 * Handles the messages.
 * @returns {void}
 */
async function messageHandler() {
    CLIENT.on("message", (receivedTopic, receivedMessage) => {
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`received message on topic ${receivedTopic}: ${receivedMessage.toString()}`);
    });
}

/**
 * Starts the control.
 * @returns {void}
 */
export function start() {
    // eslint-disable-next-line no-console -- message to console
    console.info("control started.");
    topicHandler();
    messageHandler();
}
