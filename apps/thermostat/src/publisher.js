import { client } from "./main.js";

/**
 * Publishes a random temperature to a given topic at specified intervals.
 * @param {string} topic The topic to publish the temperature to.
 * @param {number} publishIntervall The interval in milliseconds at which to publish the temperature.
 * @returns {void}
 */
function publishTemperature(topic, publishIntervall) {
    setInterval(() => {
        do {

            // eslint-disable-next-line no-var -- var is used here because block scope is annoying in this case
            var temperature = Math.floor(Math.random() * 100);
        } while (temperature > 30);

        client.publish(topic, temperature.toString());
    }, publishIntervall);
}

export { publishTemperature };
