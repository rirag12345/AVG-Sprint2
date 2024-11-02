/**
 * An object representing the heating levels of a thermostat.
 * The keys are the levels of the thermostat, and the values are arrays,
 * where the first value is the lower temperature limit and the second value is the upper temperature limit.
 * @type {Object<number, [number, number]>}
 */
// eslint-disable-next-line no-unused-vars -- testing
const radiatorHeatingLevel = {
    1: [5, 10],
    2: [12, 15],
    3: [16, 18],
    4: [19, 22],
    5: [23, 25],
    getRandomHeatingLevel() {
        return Object.keys(this)[
            Math.floor(Math.random() * Object.keys(this).length)
        ];
    }
};
