/**
 * Main entry point for the thermostat application.
 * Responsible for connecting to mosquitto and starting the consumer and producer.
 * @author Philip Neuffer
 * @requires mqtt
 * @exports CLIENT
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
const CLIENT = mqtt.connect(CONNECTION_STRING);

/**
 * The room in which the thermostat is located.
 * @constant {string}
 */
const ROOM = process.argv[2];

/**
 * The topic to publish and subscribe to.
 * The first argument passed to node is appended and inidcates the room in which the thermostat is located.
 */
const topic = `thermostat-${ROOM}`;

// /**
//  * The intervall after which the temperature is published in milliseconds.
//  * @type {number}
//  */
// const publishIntervall = 2000;

CLIENT.on("connect", () => {
    pollTemperature(topic);
});

export { CLIENT, ROOM };
