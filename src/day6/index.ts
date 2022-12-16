import { Day } from "../day";

class Day6 extends Day {

    constructor(){
        super(6);
    }
    solveForPartOne(input: string): string {
        const signalArray: Array<string> = input.split('')
        const startingMarkersIndicies: Array<number> = []
        signalArray.forEach((character, index) => {
        if (index > 3) {
            const packet = signalArray.slice(index - 3, index +1)
            const occurrences = packet.reduce(function (acc: {[key: string]: number}, curr: string) {
                return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
              }, {});
            if (Object.values(occurrences).every((value) => value === 1)) {
                startingMarkersIndicies.push(index)
            }
        }
        })
        return (startingMarkersIndicies[0] + 1).toString();
    }

    solveForPartTwo(input: string): string {
        const signalArray: Array<string> = input.split('')
        const startingMarkersIndicies: Array<number> = []
        signalArray.forEach((character, index) => {
        if (index > 13) {
            const packet = signalArray.slice(index - 13, index +1)
            const occurrences = packet.reduce(function (acc: {[key: string]: number}, curr: string) {
                return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
              }, {});
            if (Object.values(occurrences).every((value) => value === 1)) {
                startingMarkersIndicies.push(index)
            }
        }
        })
        return (startingMarkersIndicies[0] + 1).toString();
    }
}

export default new Day6;