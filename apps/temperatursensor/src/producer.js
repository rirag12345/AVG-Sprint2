/**
 * Producer module for publishing messages into MQTT topics.
 * (The application periodically publishes the meassured temperature in a given room using the mqtt protocoll.)
 * @module publisher
 * @requires CLIENT
 * @exports publishTemperature
 * @author Philip Neuffer
 * @author Felix Jaeger
 */
import { CLIENT } from "./main.js";

/**
 * Publishes a (pseudo)random temperature to a given topic at specified intervals.
 * @author Philip Neuffer
 * @param {string} topic The topic to publish the temperature to.
 * @param {number} publishIntervall The interval in milliseconds after which to publish the temperature.
 * @returns {void}
 */
export function publishTemperature(topic, publishIntervall) {
    setInterval(() => {

        // Temperaturwerte zwischen 0 und 30 Grad Celsius
        const temperature = Math.floor(Math.random() * 0.3 * 100);

        CLIENT.publish(topic, temperature.toString());
        // eslint-disable-next-line no-console -- debug message to console
        console.debug(`published temperature of ${temperature}°C`);
    }, publishIntervall);
}
