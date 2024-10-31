import mqtt from "mqtt";

const connectionString = "mqtt://localhost:1883";
const client = mqtt.connect(connectionString);

client.on("connect", () => {
    client.subscribe("Test", err => {
        if (!err) {
            client.publish("Test", "Hello World");
        }
    });
});

client.on("message", (topic, message) => {
    console.log(`${message} from topic ${topic}`);
    client.end();
});
