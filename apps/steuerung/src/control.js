/**
 * Control module for managing smart devices in a home.
 * Using integration technique message exchange via MQTT.
 * Control acts as consumer and producer for messages.
 * @module control
 * @requires REGISTRATION_CLIENT
 * @requires CONTROL_CLIENT
 * @exports start
 * @author Felix Jaeger
 */
import { REGISTRATION_CLIENT, CONTROL_CLIENT } from "./main.js";

/**
 * The topics the control is managing.
 * Contains all registered devices with thair topics.
 */
const topics = [];

/**
 * Register a new device.
 * @param {string} device to register
 * @returns {void}
 */
function registerDevice(device) {
    topics.push(device);
    CONTROL_CLIENT.subscribe(device, { qos: 1 }); // qos 1 to ensure reliablity.
    // eslint-disable-next-line no-console -- debug message to console
    console.debug(`registered new device: ${device}`);
}

/**
 * Handles the registration messages.
 * @returns {void}
 */
function registrationHandler() {
    REGISTRATION_CLIENT.on("message", (receivedTopic, receivedMessage) => {
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`received message on topic ${receivedTopic.toString()}: ${receivedMessage.toString()}`);

        // Check if device is pinging on 'control' topic.
        if (receivedTopic === "control") {

            // Check if new device is pinging.
            if (!topics.includes(receivedMessage)) {
                registerDevice(receivedMessage);
            }
        }
    });
}

/**
 * Handles the control messages.
 * @returns {void}
 */
function controlHandler() {
    CONTROL_CLIENT.on("message", (receivedTopic, receivedMessage) => {

        // Check if message was from a temperature sensor.
        if (receivedTopic.contains("temperatursensor-")) {
            // eslint-disable-next-line unicorn/prefer-string-slice, no-restricted-properties -- String.slice is outdated
            const room = receivedTopic.substring(17);

            // eslint-disable-next-line no-console -- debug message to console
            console.debug(`received temperature for room ${room}: ${receivedMessage}°C`);
        }
    });
}

/**
 * Status whether control has already been started.
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
    REGISTRATION_CLIENT.subscribe("control", { qos: 1 }); // qos 1 to ensure reliablity.
    registrationHandler();
    controlHandler();
}
