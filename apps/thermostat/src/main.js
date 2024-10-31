import mqtt from "mqtt";
import { publishTemperature } from "./publisher.js";
import { pollTemperature } from "./subscriber.js";

const connectionString = "mqtt://localhost:1883";
const client = mqtt.connect(connectionString);
const topic = "thermostat";
const publishIntervall = 2000;

client.on("connect", () => {
    publishTemperature(topic, publishIntervall);
    pollTemperature(topic);
});

export { client };
