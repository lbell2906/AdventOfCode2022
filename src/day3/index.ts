import { SocketAddress } from "net";
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


    solveForPartTwo(input: string): string {
        return '';
    }
}

export default new Day3;