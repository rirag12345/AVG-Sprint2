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
 * Publishes a (pseudo)random temperature with it's room to the temperature sensor topic at specified intervals.
 * @param {string} room The room of the temperature sensor.
 * @param {number} publishIntervall The interval in milliseconds at which the temperature should be published.
 * @returns {void}
 */
function publishTemperature(room, publishIntervall) {
    setInterval(() => {

        // Simulate temperature values between 0 and 30 degrees Celsius.
        const temperature = Math.floor(Math.random() * 0.3 * 100);

        CLIENT.publish("temperatursensor", `${room}:${temperature.toString()}`, { qos: 1 }, error => { // qos 1 to ensure reliablity.
            if (error) {
                // eslint-disable-next-line no-console -- error message to console
                console.error(`failed to publish temperature: ${error.message}`);
            }
        });
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`published temperature of ${temperature}°C`);
    }, publishIntervall);
}

/**
 * Starts the sensor.
 * @param {string} room The room of the temperature sensor.
 * @param {number} publishIntervall The interval in milliseconds at which the temperature should be published.
 * @returns {void}
 */
export function start(room, publishIntervall) {
    // eslint-disable-next-line no-console -- message to console
    console.info("temperature sensor started.");
    publishTemperature(room, publishIntervall);
}
