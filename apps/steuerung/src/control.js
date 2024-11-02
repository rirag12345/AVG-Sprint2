/**
 * Control module for managing smart devices.
 * Using integration technique message exchange via MQTT topics.
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
 * Starts the control.
 * @returns {void}
 */
export function start() {
    console.log("Control started.");
    topicHandler();
    messageHandler();
}

/**
 * Handles the topics.
 */
async function topicHandler() {
    await CLIENT.on("packetsend", (packet) => {
        console.log(`Received packet on topic ${receivedTopic = packet.topic}`);
        if(!topics.includes(receivedTopic)) {
            topics.Add(receivedTopic);
            CLIENT.subribe(receivedTopic);
        }
    });
}

/**
 * Handles the messages.
 */
async function messageHandler() {
    await CLIENT.on("message", (receivedTopic, receivedMessage) => {
        console.log(`Received message on topic ${receivedTopic}: ${receivedMessage.toString()}`);
    });
}
