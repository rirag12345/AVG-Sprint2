/**
 * Control module for managing smart devices in a home.
 * Managing heating in rooms by commanding thermostats based on temperature values from temperature sensors.
 * Using treshold to decide if heating should turned up or down.
 * Also creates a log file for temperature values.
 * Using integration technique message exchange via MQTT.
 * Control acts as consumer and producer for messages.
 * @module control
 * @requires CLIENT
 * @exports start
 * @author Felix Jaeger
 */
import { CLIENT } from "./main.js";
import fs from "node:fs";

/**
 * Handles incoming messages from all temperature sensors.
 * Checks if temperature is below or above teshhold.
 * Sends commands to thermostats to turn up or turn down heating.
 * Logs the temperature values into the log file.
 * @returns {void}
 */
function messageHandler() {
    CLIENT.on("message", (receivedTopic, receivedMessage) => {
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`received message on topic ${receivedTopic.toString()}: ${receivedMessage.toString()}`);
        const room = receivedMessage.toString().split(":")[0];
        const temperature = receivedMessage.toString().split(":")[1];

        // building current date with time to include in log file. comes in UTC time zone.
        const DateTime = new Date();

        // converting dateTime to ISO string.
        const timestamp = DateTime.toISOString();

        // log temperature into log file.
        fs.appendFile("./log/control.log", `${timestamp}: temperature in room ${room}: ${temperature}°C\n`, () => {});

        // check if temperature is too low. if yes, turn up heating.
        if (temperature < 19) {
            // eslint-disable-next-line no-console -- message to console
            console.info(`room ${room} is too cold (<19°C). turning up heating.`);
            CLIENT.publish("thermostat", `${room}:23`);
        }

        // check if temperature is high enough. if yes, turn down heating.
        if (temperature >= 23) {
            // eslint-disable-next-line no-console -- message to console
            console.info(`room ${room} is warm enough (>=23°C). turning down heating.`);
            CLIENT.publish("thermostat", `${room}:19`);
        }
    });
}

/**
 * Starts the control.
 * @returns {void}
 */
export function start() {
    // eslint-disable-next-line no-console -- message to console
    console.info("control started.");

    // create log file.
    fs.writeFile("./log/control.log", "-------------------- temperature log file --------------------\n", () => {});

    // subscribe to temperature sensors topic to receive temperature values from all sensors.
    CLIENT.subscribe("temperatursensor");
    messageHandler();
}
