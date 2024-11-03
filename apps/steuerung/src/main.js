/**
 * Main entry point for the control application.
 * Responsible for connecting to mosquitto and starting the control itself.
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
export const CLIENT = mqtt.connect(CONNECTION_STRING);

CLIENT.on("connect", () => {
    // eslint-disable-next-line no-console -- message to console
    console.info("control application connected to message broker.");
    start();
});
