import { Day } from "../day";

class Day3 extends Day {

    constructor(){
        super(3);
    }
    splitByLine = (input: string): Array<string> => input.split('\n')

    halfString = (input: string): {firstHalf: string, secondHalf:string} => {
        const middle = Math.floor(input.length / 2);
        const firstHalf = input.slice(0, middle);
        const secondHalf = input.slice(middle)
        return {firstHalf: firstHalf, secondHalf: secondHalf}
    }

    findCommonCharacter = (string1: string, string2: string): string | undefined => {
        return Array.from(string1).find((character) => string2.includes(character))

    }

    isUpperCase = (character: string): boolean => {
        return character === character.toUpperCase()
    }

    findCharacterScore = (character: string): number => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz'
        const alphabetIndex = alphabet.indexOf(character.toLowerCase()) + 1
        return this.isUpperCase(character) ? alphabetIndex + 26 : alphabetIndex
    }

    solveForPartOne(input: string): string {
        const data = this.splitByLine(input)
        let totalScore = 0
        data.forEach((rucksack) => {
            const comparments = this.halfString(rucksack)
            const commonCharacther = this.findCommonCharacter(comparments.firstHalf, comparments.secondHalf)
            const score = commonCharacther ? this.findCharacterScore(commonCharacther) : 0
            totalScore += score
        })
        return totalScore.toString();
    }

    splitIntoChunk = (inputArray: Array<any>, chunkSize: number): Array<Array<any>> => {
        const result = inputArray.reduce((resultArray, item, index) => { 
        const chunkIndex = Math.floor(index/chunkSize)

        if(!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] 
        }
        resultArray[chunkIndex].push(item)
        return resultArray
        }, [])
        return result
    }

    findCommonOfThree = (string1: string, string2: string, string3: string ): string | undefined => {
        const string1Array = Array.from(string1)
        const string2Matches = string1Array.filter((character) => string2.includes(character)) 
        const string3Matches = string1Array.filter((character) => string3.includes(character)) 
        return this.findCommonCharacter(string2Matches.join(''), string3Matches.join('')) 
    }

    solveForPartTwo(input: string): string {
        const data = this.splitByLine(input)
        const dataSplit = this.splitIntoChunk(data, 3)
        let totalBadgeScore = 0
        dataSplit.forEach((group) => {
            const badge = this.findCommonOfThree(group[0], group[1], group[2])
            const badgeScore = badge ? this.findCharacterScore(badge) : 0
            totalBadgeScore += badgeScore
        })

        return totalBadgeScore.toString();
    }
}

export default new Day3;