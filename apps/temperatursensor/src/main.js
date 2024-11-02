import { publishTemperature } from "./publisher.js";
import mqtt from "mqtt";

/**
 * Main entry point for the temperatursensor application.
 * The application periodically publishes the meassured temperature in a given room using the mqtt protocoll
 * @author Philip Neuffer
 * @requires mqtt
 * @exports CLIENT
 */

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
const PUBLISH_INTERVALL = 2000;

CLIENT.on("connect", () => {
    publishTemperature(topic, PUBLISH_INTERVALL);
});
