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
 * Adjusts the given Temperature by a random value between +- 20%
 * The returned value will alway be between 0 and 30 and atleast differ by 1
 * @param {number} temperature The temperature to be adjusted.
 * @returns {number} The adjusted temperature - will always be a integer.
 */
function adjustTemperature(temperature) {
    const factor = 0.2;
    let result = ((Math.random() * 2 - 1) * factor * temperature) + temperature;

    /* Make sure the temperature differs by at least 1.
    *  This is to prevent the temperature from staying the same value for long.
    */
    if (Math.abs(result - temperature) < 1) {
        result += (Math.random() < 0.5) ? 1 : -1;
    }

    // Make sure the temperature stays within [0, 30].
    result = Math.max(0, Math.min(30, result));
    return Math.ceil(result);
}

/**
 * Publishes a (pseudo)random temperature with its room to the temperature sensor topic at specified intervals.
 * @param {string} room The room of the temperature sensor.
 * @param {number} publishInterval The interval in milliseconds at which the temperature should be published.
 * @returns {void}
 */
function publishTemperature(room, publishInterval) {

    // Initial temperature value of 19° C.
    let temperature = 19;

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
