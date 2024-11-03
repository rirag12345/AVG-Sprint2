/**
 * Thermostat class
 * @constructor
 * @author Philip Neuffer
 */
export class Thermostat {

    // TODO: check if this class is needed
    #temperature;
    #currentLevel;
    #levelTemperatureDomain = {
        0: [7, 7],
        1: [12, 15],
        2: [16, 19],
        3: [20, 23],
        4: [24, 27],
        5: [28, 30]
    };

    getCurrentLevel() {
        return this.#currentLevel;
    }

    getTemperature() {
        return this.#temperature;
    }

    setCurrentLevel(newLevel) {
        if (
            !(
                typeof newLevel !== "number" ||
                Math.floor(newLevel) !== newLevel ||
                newLevel > 5
            )
        ) {
            this.#currentLevel = newLevel;
        } else {
            throw new Error("Parameter is invalid");
        }
    }

    /**
     *Set the temperature of the thermostat and updates the current level.
     * @param {number} newTemperature the new temperature to assign to the thermostat
     * @throws {Error} Parameter is invalid
     * @returns {void}
     */
    setTemperature(newTemperature) {
        if (!(typeof this.#temperature !== "number" || newTemperature > 30)) {
            this.#currentLevel = Object.values(
                this.#levelTemperatureDomain
            ).findIndex(value => newTemperature >= value[0] && newTemperature <= value[1]);
        } else {
            throw new Error("Parameter is invalid");
        }
    }

    constructor(newLevel) {
        this.setCurrentLevel(newLevel);

        /* this initializes the temperature to the first integer less than or equal to
            the mean of the upper and lower limit associated with the level
        */
        this.temperature = Math.floor(
            (this.#levelTemperatureDomain[this.#currentLevel][0] +
                this.#levelTemperatureDomain[this.#currentLevel][1]) / 2
        );
    }
}
