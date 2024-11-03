/**
 * Main entry point for the temperature sensor application.
 * Responsible for connecting to mosquitto and starting the producer.
 * @module main
 * @requires mqtt
 * @exports CLIENT
 * @author Philip Neuffer
 * @author Felix Jaeger
 */
import mqtt from "mqtt";
import { publishTemperature } from "./producer.js";

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
 * The room in which the temperatursensor is located.
 * @constant {string}
 */
const room = process.argv[2];

/**
 * The topic to publish and subscribe to.
 * The first argument passed to node is appended and inidcates the room in which the temperaturesensor is located.
 */
const topic = `temperatursensor-${room}`;

/**
 * The intervall after which the temperature is published in milliseconds.
 * @constant {number}
 */
const PUBLISH_INTERVALL = 5000;

CLIENT.on("connect", () => {
    // eslint-disable-next-line no-console -- message to console
    console.info("temperature sensor application connected to message broker.");
    publishTemperature(topic, PUBLISH_INTERVALL);
});
