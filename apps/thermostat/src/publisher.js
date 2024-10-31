import { client } from "./main.js";

function publishTemperature(topic, publishIntervall) {
    setInterval(() => {
        do {
            // Absichtlich var statt let, da block scope hier unpraktisch ist
            var temperature = Math.floor(Math.random() * 100);
        } while (temperature > 30);

        client.publish(topic, temperature.toString());
    }, publishIntervall);
}

export { publishTemperature };
