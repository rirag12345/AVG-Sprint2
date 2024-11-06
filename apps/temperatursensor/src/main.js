/**
 * Main entry point for the temperature sensor application.
 * Responsible for connecting to the message broker mosquitto and starting the sensor itself.
 * @module main
 * @requires mqtt
 * @exports CLIENT
 * @author Philip Neuffer
 * @author Felix Jaeger
 */
import mqtt from "mqtt";
import { start } from "./sensor.js";

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

/**
 * The room in which the temperature sensor is located.
 * @constant {string}
 */
const room = process.argv[2];

/**
 * The intervall after which the temperature is published in milliseconds.
 * @constant {number}
 */
const PUBLISH_INTERVAL = 100;

CLIENT.on("connect", () => {
    // eslint-disable-next-line no-console -- message to console
    console.info("temperature sensor application connected to message broker.");
    start(room, PUBLISH_INTERVAL);
});
