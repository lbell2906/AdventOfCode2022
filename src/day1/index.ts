import { Day } from "../day";


class Day1 extends Day {

    constructor(){
        super(1);
    }

    splitByBlankLine = (input: string) : Array<string> => input.split('\n')
    addCalories = (caloriesArray: Array<number>): number => caloriesArray.reduce((a , b) => a + b, 0)

    groupAndCummulateCalories = (calorieArray : Array<string>) : Array<number> => {
        const elfTotalArrays: Array<number> = []
        let newElfEntry: Array<number> = []
        calorieArray.forEach((calorieEntry) => {
            if (calorieEntry === ''){
                elfTotalArrays.push(this.addCalories(newElfEntry))
                newElfEntry = []
            } else {
                newElfEntry.push(parseInt(calorieEntry))
            }
        })
        return elfTotalArrays
    }
    part1a = (input: string) => {
        return this.groupAndCummulateCalories(this.splitByBlankLine(input));
    }

    part1b = (totalCalories: Array<number>) => {
        return Math.max(...totalCalories).toString()
    }

    solveForPartOne(input: string): string {
        const elfArrays: Array<number> = this.part1a(input);
        return this.part1b(elfArrays)
    }

    solveForPartTwo(input: string): string {
        const calroiesTotals = this.part1a(input);
        const sortedCalorieTotals = calroiesTotals.sort((a, b) => b - a)
        return this.addCalories(sortedCalorieTotals.slice(1,4)).toString();
    }
}

export default new Day1;