/**
 * Main entry point for the control application.
 * Responsible for connecting to the message broker mosquitto and starting the control itself.
 * @module main
 * @requires mqtt
 * @exports CLIENT
 * @author Felix Jaeger
 */
import mqtt from "mqtt";
import { start } from "./control.js";

/**
 * The connection string to connect to the message broker.
 * @constant {string}
 */
const CONNECTION_STRING = "mqtt://localhost:1883";

/**
 * The mqtt client for the message broker.
 * @constant {mqtt.Client}
 */
export const CLIENT = mqtt.connect(CONNECTION_STRING, {

    // reconnectPeriod: 0, // prevent reconnecting
    // autoUseTopicAlias: true, // improve performance
    // autoAssignTopicAlias: true // improve performance
});

/**
 * Status whether control was already connected to mosquitto.
 * @type {boolean}
 */
let isStarted = false;

CLIENT.on("connect", () => {
    // eslint-disable-next-line no-console -- message to console
    console.info("control application connected to message broker.");

    // Start the control if it was not already started.
    if (!isStarted) {
        start();
        isStarted = true;
    }
});

CLIENT.on("reconnect", () => {
    // eslint-disable-next-line no-console -- debug message to console
    console.debug("control application reconnecting to message broker.");
});

CLIENT.on("close", () => {
    // eslint-disable-next-line no-console -- debug message to console
    console.debug("control application disconnected.");
});

CLIENT.on("offline", () => {
    // eslint-disable-next-line no-console -- debug message to console
    console.debug("control application went offline.");
});

CLIENT.on("error", error => {
    // eslint-disable-next-line no-console -- error message to console
    console.error(`control application encountered an error: ${error.message}`);
});
