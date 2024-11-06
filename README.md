# AVG Sprint 2 Abgabe Gruppe 2

## Projektbeschreibung

Das Projekt basert auf der gegebenen Aufgabenstellung und soll ein Smart Home Szenario mit der Verwendung der Integrationstechnik Nachrichtenaustausch unter der Verwendung
des MQTT Protokolls und dem Message Broker Eclipse Mosquitto simulieren.

## Verzeichnisstruktur

### Mosquitto

Die benötigten Dateien für Mosquitto liegen unter [/extras/compose/mosquitto](/extras/compose/mosquitto)
Zum starten von Mosquitto ist eine [compose.yaml](/extras/compose/mosquitto/compose.yaml) bereitgestellt.
Mosquitto kann aus dem diesem Verzeichnis mittels ```docker compose up```gestartet werden.

### Apps

Das Projekt beinhaltet drei "Unterprojekte", welche unter [/apps](/apps) zu finden sind.
Jedes dieser Projekte stellt eines der Devices aus der Aufgabenstellung dar (Temperatursensoren, Thermostate, Steuerung)

#### Temperatursensor

Die `temperatursensor`-Anwendung simuliert einen Temperatursensor, welcher zufällige Temperaturwerte (zwischen 0° und 30° Celsius) auf dem `temperatursensor`-Thema veröffentlicht.

Es können beliebig viele `Temperatursensoren` gleichzeitig laufen

Aufruf mit `npm start <raum>`, wobei für `<raum>` ein beliebiger Raum angegeben werden kann, indem sich der Sensor befindet. Wird kein Raum angegeben, befindet sich der Sensor in keinem Raum.

#### Steuerung

Die `steuerung`-Anwendung realisiert eine prototypische Steuerung und gibt befehle an den Thermostat welche auf dem `thermostat`-Thema veröffentlicht werden.

Aufruf mit `npm start`.

Die geforderte Logdatei für Temperaturwerte (`control.log`) wird unter [/log](/apps/steuerung/log) generiert.

#### Thermostat

Die `thermostat`-Anwendung simuliert einen Thermostat, welcher auf Befehle der `Steuerung` reagiert und die Heizung hoch bzw. herunterschaltet.
Es können beliebig viele `Thermostate` laufen

Aufruf mit `npm start <raum>`, wobei für `<raum>` ein beliebiger Raum angegeben werden kann, indem sich das Thermostat befindet. Wird kein Raum angegeben, befindet sich das Thermostat in keinem Raum.

## Komponentendiagram

Ein Komponentendiagram kann unter [/extras/documentation](/extras/documentation) gefunden werden
