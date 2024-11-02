import { CLIENT } from "./main.js";

/**
 * Publishes a (pseudo)random temperature to a given topic at specified intervals.
 * @author Philip Neuffer
 * @param {string} topic The topic to publish the temperature to.
 * @param {number} publishIntervall The interval in milliseconds after which to publish the temperature.
 * @returns {void}
 */
function publishTemperature(topic, publishIntervall) {
    setInterval(() => {
        do {
            // eslint-disable-next-line no-var -- this is a CLI application
            var temperature = Math.floor(Math.random() * 100);
        } while (temperature > 30);

        CLIENT.publish(topic, temperature.toString());
    }, publishIntervall);
}

export { publishTemperature };
