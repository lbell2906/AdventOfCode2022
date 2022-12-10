import { Day } from "../day"

class Day4 extends Day {

    constructor(){
        super(4);
    }
    splitByLine = (input: string): Array<string> => input.split('\n')

    numbersInRange = (numberRangeLimits: Array<number>): Array<number> => {
        const range: Array<number> = [];
        for (var i = numberRangeLimits[0]; i <= numberRangeLimits[1]; i++) {
            range.push(i);
        }
        return range
    }

    formattedRange = (maxInPair: number, elfsRange: Array<number>): string  => {
        const lengthOfRange = elfsRange.length
        const startDots = elfsRange[0] -1
        const endDots = maxInPair - elfsRange[lengthOfRange - 1]
        const string = '.'.repeat(startDots) + '-'.repeat(lengthOfRange) + '.'.repeat(endDots)
        return string
    }

    checkRangeIsWithinAnother = (shortestRange: Array<number>,formattedRange: Array<string>): boolean => {
        const results: Array<boolean> = []
            shortestRange.forEach((numberInRange) => {
                const index = numberInRange -1
                const withinOtherRange = formattedRange[0][index] === formattedRange[1][index]
                withinOtherRange ? results.push(true) : results.push(false)
            })
        return results.every((result) => result === true)
    }

    solveForPartOne(input: string): string {
        let data: Array<boolean> = this.splitByLine(input).map((pair) => {
        const [elf1, elf2]  = pair.split(',')
        const elf1Range = this.numbersInRange([...(elf1.split('-').map((number) => parseInt(number)))])
        const elf2Range = this.numbersInRange([...(elf2.split('-').map((number) => parseInt(number)))])
        const maxInPair = Math.max( ...[...elf1Range, ...elf2Range])
        const shortestRange = elf1Range.length >= elf2Range.length ? elf2Range :  elf1Range
        const formattedRange = [this.formattedRange(maxInPair, elf1Range), this.formattedRange(maxInPair, elf2Range)]
        return this.checkRangeIsWithinAnother(shortestRange, formattedRange)
    })
    let resultsCount = 0
    data.forEach((result) => {
        if (result === true) {
            resultsCount += 1
        }
    })
        return resultsCount.toString()
    }

    solveForPartTwo(input: string): string {
        let data: Array<boolean> = this.splitByLine(input).map((pair) => {
            const [elf1, elf2]  = pair.split(',')
            const elf1Range = this.numbersInRange([...(elf1.split('-').map((number) => parseInt(number)))])
            const elf2Range = this.numbersInRange([...(elf2.split('-').map((number) => parseInt(number)))])
            const maxInPair = Math.max( ...[...elf1Range, ...elf2Range])
            const formattedRange = [this.formattedRange(maxInPair, elf1Range), this.formattedRange(maxInPair, elf2Range)]
          return formattedRange[0].split('').some((character, index) =>  character === '-' ? character === formattedRange[1][index] : false)
        })
        return data.filter((value) => value === true).length.toString();

    }
}

export default new Day4;