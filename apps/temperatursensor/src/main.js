import { publishTemperature } from "./publisher.js";

/**
 * Main entry point for the temperatursensor application.
 * @author Philip Neuffer
 * @requires mqtt
 * @exports CLIENT
 */
// TODO: add explainaition of what this project does
import mqtt from "mqtt";

/**
 * The connection string to connect to the message broker.
 * @constant {string}
 */
const connectionString = "mqtt://localhost:1883";

/**
 * The mqtt client for the message broker.
 * @constant {mqtt.Client}
 */
const CLIENT = mqtt.connect(connectionString);

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
 * @type {number}
 */
const publishIntervall = 2000;

CLIENT.on("connect", () => {
    publishTemperature(topic, publishIntervall);
});

export { CLIENT };
