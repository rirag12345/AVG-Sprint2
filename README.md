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

Die `temperatursensor`-Anwendung simuliert einen Temperatursensor in einem bestimmten Raum, welcher mit einer Zufallskomponente in regelmäßigen Abständen Temperaturwerte (zwischen 0° und 25° Celsius) zusammen mit seinem Raum auf dem `temperatursensor`-Thema veröffentlicht. Die Temperatur kann sich hierbei in einem Intervall um maximal 20% verändern.

Es können beliebig viele `Temperatursensoren` gleichzeitig laufen.

Aufruf mit `npm start <raum>`, wobei für `<raum>` ein beliebiger Raum angegeben werden kann, indem sich der Sensor befindet. Wird kein Raum angegeben, befindet sich der Sensor in keinem Raum.

#### Steuerung

Die `steuerung`-Anwendung realisiert die geforderte prototypische Steuerung, welche die anderen Devices verwaltet bzw. die Smart Home Steuerung realisiert. Die Steuerung empfängt über das `temperatursensor`-Thema Temperaturwerte für bestimmmte Räume und gibt abhängig davon Befehle an die Thermostate, welche auf dem `thermostat`-Thema veröffentlicht werden. Fällt beispielsweise die Temperatur in einem Raum unter 19° Celsius, werden die Heizungen in diesem Raum über ihre Thermostate aufgedreht, indem sie auf 23° Celsius gestellt werden. Erreicht die Temperatur in einem Raum 23° Celsius, ist der Raum warm genug und die Heizungen werden nach dem selben Prinzip runter gedreht, indem sie auf 19° Celsius eingestellt werden.

Aufruf mit `npm start`.

Die geforderte Logdatei für Temperaturwerte (`control.log`) wird unter [/log](/apps/steuerung/log) generiert.

#### Thermostat

Die `thermostat`-Anwendung simuliert einen Thermostat einer Heizung in eimen bestimmten Raum, welcher auf Befehle der `steuerung` reagiert und die Heizung hoch bzw. herunterschaltet.

Es können beliebig viele `Thermostate` laufen.

Aufruf mit `npm start <raum>`, wobei für `<raum>` ein beliebiger Raum angegeben werden kann, indem sich das Thermostat befindet. Wird kein Raum angegeben, befindet sich das Thermostat in keinem Raum.

## Komponentendiagram

Ein Komponentendiagram kann unter [/extras/documentation](/extras/documentation) gefunden werden.

## Dokumentation mittels JSDoc

// TODO vervollständigen.
