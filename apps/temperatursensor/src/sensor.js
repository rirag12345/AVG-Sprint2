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
 * Publishes a (pseudo)random temperature to a given topic at specified intervals.
 * @param {string} topic The topic to publish the temperature to.
 * @param {number} publishIntervall The interval in milliseconds after which to publish the temperature.
 * @returns {void}
 */
function publishTemperature(topic, publishIntervall) {
    setInterval(() => {

        // Simulate temperature values between 0 and 30 degrees Celsius.
        const temperature = Math.floor(Math.random() * 0.3 * 100);

        CLIENT.publish(topic, temperature.toString(), { qos: 1 }, error => { // qos 1 to ensure reliablity.
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
 * Registers the sensor with the control.
 * Ensures registration by pinging the control regularly.
 * @param {string} topic The topic for the temperature sensor.
 * @returns {void}
 */
function register(topic) {
    setInterval(() => {
        CLIENT.publish("control", topic, { qos: 1 }, error => { // qos 1 to ensure reliablity.
            if (error) {
                // eslint-disable-next-line no-console -- error message to console
                console.error(`Failed to register sensor: ${error.message}`);
            }
        });
        // eslint-disable-next-line no-console -- debug message to console
        console.debug("registered temperature sensor with control by pinging.");
    }, 10000);
}

/**
 * Starts the sensor.
 * @param {string} topic The topic for the temperature sensor.
 * @param {number} publishIntervall The interval in milliseconds at which the temperature should be published.
 * @returns {void}
 */
export function start(topic, publishIntervall) {
    // eslint-disable-next-line no-console -- message to console
    console.info("temperature sensor started.");
    register(topic);
    publishTemperature(topic, publishIntervall);
}
