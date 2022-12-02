import { Day } from "../day";

interface MoveObject {
    roundScore: number
    drawValue: string
    winValue: string
    looseValue: string
}

interface roundObject {
    [key: string] : {[key: string] : number}
}

class Day2 extends Day {

    constructor(){
        super(2);
    }
 // --------------------------- PART 1 -------------------------------
    // A X rock, B Y paper C Z Scissors
    moves: {[key: string] : MoveObject} = {
        A: {roundScore: 1, drawValue: 'X', winValue: 'Z', looseValue: 'Y'},
        B: {roundScore: 2, drawValue: 'Y', winValue: 'X', looseValue: 'Z'},
        C: {roundScore: 3, drawValue: 'Z', winValue: 'Y', looseValue: 'X'},
        X: {roundScore: 1, drawValue: 'A', winValue: 'C', looseValue: 'B'},
        Y: {roundScore: 2, drawValue: 'B', winValue: 'A', looseValue: 'C'},
        Z: {roundScore: 3, drawValue: 'C', winValue: 'B', looseValue: 'A'}
    }

    roundScores: {[key: string]: number} = {you: 6, them: 0, none: 3}
    

    findRoundResult = (theirMove: string, yourMove: string): string => {
        if (this.moves[theirMove].winValue === yourMove) return 'them'
        if (this.moves[theirMove].looseValue === yourMove) return 'you'
        if (this.moves[theirMove].drawValue === yourMove) return 'none'
        else return 'Invalid Move';
    }

    getYourRoundScore = (moves: string): number => {
        const [theirMove, yourMove]  = moves.split(' ')
        const objectScore = this.moves[yourMove].roundScore
        const roundResult = this.findRoundResult(theirMove, yourMove)
        const resultScore = this.roundScores[roundResult]
        return objectScore + resultScore;
    }

    splitByBlankLine = (input: string): Array<string> => input.split('\n')

    solveForPartOne(input: string): string {
        const data = this.splitByBlankLine(input)
        let yourTotalScore: number = 0
        data.forEach((move) => {
            yourTotalScore += this.getYourRoundScore(move)
        })
        return yourTotalScore.toString()
    }
    // --------------------------- PART 2 -------------------------------
    // X you loose, Y draw, Z you win
    // A rock, B paper C Scissors
    movesPart2: roundObject = {
       A: { X: 3, Y: 4, Z: 8 },
       B: { X: 1, Y: 5, Z: 9 },
       C: { X: 2, Y: 6, Z: 7 }
    }

    getRoundScorePt2 = (roundInfo: string): number => {
        const [theirMove, outcome] = roundInfo.split(' ')
        return this.movesPart2[theirMove][outcome]
    }

    myTotalScorePt2: number = 0

    solveForPartTwo(input: string): string {
        const data = this.splitByBlankLine(input)
        data.forEach((move) => {
            this.myTotalScorePt2 += this.getRoundScorePt2(move)
        })
        return this.myTotalScorePt2.toString()
    }
}

export default new Day2