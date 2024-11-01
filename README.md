# AVG Sprint 2 Abgabe Gruppe 2

## Projektbeschreibung

Das Projekt basert auf der gegebenen Aufgabenstellung und soll ein Smart Home Szenario mit der Verwendung der Integrationstechnik Nachrichtenaustausch unter der Verwendung 
des MQTT Protokolls und dem Message Broker Eclipse Mosquitto simulieren.

# Verzeichnisstruktur 


## Mosquitto

Die benötigten Dateien für Mosquitto liegen unter [/extras/compose/mosquitto](/extras/compose/mosquitto)
Zum starten von Mosquitto ist eine [compose.yaml](/extras/compose/mosquitto/compose.yaml) bereitgestellt.
Mosquitto kann aus dem diesem Verzeichnis mittels ```docker compose up```gestartet werden.

## Apps

Das Projekt beinhaltet drei "Unterprojekte", welche unter [/apps](/apps) zu finden sind.
Jedes dieser Projekte stellt eines der Devices aus der Aufgabenstellung dar (Temperatursensoren, Thermostate, Steuerung)

### Thermostat

Die `thermostat`-Anwendung veröffentlicht zufällige Temperaturwerte (>= 30° Celsius) auf einem bestimmten Thema und abonniert dieses Thema ... 
//TODO
