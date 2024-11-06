/**
 * Temperature sensor module for periodically measuring the temperature in a room and sending it to the control.
 * Using integration technique message exchange via MQTT.
 * Sensor acts as producer for messages.
 * @module sensor
 * @requires CLIENT
 * @exports start
 * @author Philip Neuffer
 * @author Felix Jaeger
 */
import { CLIENT } from "./main.js";

/**
 * Adjusts the given Temperature by a random value between +- 10% and returns the nearest integer
 * @param {number} temperature Ther temperature to be adjusted.
 * @returns {number} The adjusted temperature (integer).
 */
function adjustTemperature(temperature) {
    const factor = 0.1;

    return Math.round((Math.random() * 2 - 1) * factor * temperature) + temperature;
}

/**
 * Publishes a (pseudo)random temperature with its room to the temperature sensor topic at specified intervals.
 * @param {string} room The room of the temperature sensor.
 * @param {number} publishInterval The interval in milliseconds at which the temperature should be published.
 * @returns {void}
 */
function publishTemperature(room, publishInterval) {

    // Simulate temperature values between 0 and 30 degrees Celsius.
    let temperature = Math.floor(Math.random() * 30);

    setInterval(() => {
        temperature = adjustTemperature(temperature);

        // Publish temperature to temperature sensor topic. ':" used as delimiter between room and temperature.
        CLIENT.publish("temperatursensor", `${room}:${temperature.toString()}`);
        // eslint-disable-next-line no-console -- message to console
        console.info(`published temperature of ${temperature}°C`);
    }, publishInterval);
}

/**
 * Starts the sensor.
 * @param {string} room The room of the temperature sensor.
 * @param {number} publishInterval The interval in milliseconds at which the temperature should be published.
 * @returns {void}
 */
export function start(room, publishInterval) {
    // eslint-disable-next-line no-console -- message to console
    console.info("temperature sensor started.");
    publishTemperature(room, publishInterval);
}
