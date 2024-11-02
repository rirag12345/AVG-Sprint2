/**
 * Main entry point for the thermostat application.
 * Responsible for connecting to mosquitto and starting the consumer and producer.
 * @module main
 * @requires mqtt
 * @exports Client
 * @author Philip Neuffer
 */
import mqtt from "mqtt";
import { pollTemperature } from "./consumer.js";

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
 * The room in which the thermostat is located.
 * @type {string}
 */
export const room = process.argv[2];

/**
 * The topic to subscribe to.
 * The first argument passed to node is appended and inidcates the room in which the thermostat is located.
 * @type {string}
 */
const topic = `thermostat-${room}`;

CLIENT.on("connect", () => {
    pollTemperature(topic);
});
