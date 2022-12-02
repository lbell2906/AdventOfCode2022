import { Day } from "../day";

interface MoveObject {
    roundScore: number;
    drawValue: string;
    winValue: string;
    looseValue: string
}

interface roundObject {
    [key: string] : {yourMove: string, moveScore: number, roundScore: number}
}


class Day2 extends Day {

    constructor(){
        super(2);
    }

    moves: {[key: string] : MoveObject} = {
        A: {roundScore: 1, drawValue: 'X', winValue: 'Z', looseValue: 'Y'},
        B: {roundScore: 2, drawValue: 'Y', winValue: 'X', looseValue: 'Z'},
        C: {roundScore: 3, drawValue: 'Z', winValue: 'Y', looseValue: 'X'},
        X: {roundScore: 1, drawValue: 'A', winValue: 'C', looseValue: 'B'},
        Y: {roundScore: 2, drawValue: 'B', winValue: 'A', looseValue: 'C'},
        Z: {roundScore: 3, drawValue: 'C', winValue: 'B', looseValue: 'A'}
    }

    roundScores: {[key: string]: number} = {you: 6, them: 0, noone: 3}
    

    findRoundResult = (theirMove: string, yourMove: string): string => {
        if (this.moves[theirMove].winValue === yourMove) return 'them';
        if (this.moves[theirMove].looseValue === yourMove) return 'you';
        if (this.moves[theirMove].drawValue === yourMove) return 'noone';
        else return 'Invalid Move';
    }

    getRoundScore = (moves: string, yours: boolean): number => {
        let theirMove, yourMove
        if (yours) {[theirMove, yourMove]  = moves.split(' ')}
        else {[yourMove, theirMove]  = moves.split(' ')}
        const objectScore = this.moves[yourMove].roundScore
        const roundResult = this.findRoundResult(theirMove, yourMove)
        const resultScore = this.roundScores[roundResult]
        return objectScore + resultScore;
    }

    splitByBlankLine = (input: string): Array<string> => input.split('\n');

    theirTotalScore = 0
    yourTotalScore = 0

    solveForPartOne(input: string): string {
        const data = this.splitByBlankLine(input);
        data.forEach((move) => {
            this.yourTotalScore += this.getRoundScore(move, true);
            this.theirTotalScore += this.getRoundScore(move, false);
        })
        return this.yourTotalScore.toString();
    }
// X you loose, Y draw, Z you win
// A rock, B paper C Scissors
    movesPart2: {[key: string]: roundObject} = {
       A: {
        X: {yourMove: 'C', moveScore: 3, roundScore: 0},
        Y: {yourMove: 'A', moveScore: 1, roundScore: 3},
        Z: {yourMove: 'B', moveScore: 2, roundScore: 6}
       },
       B: {
        X: {yourMove: 'A', moveScore: 1, roundScore: 0},
        Y: {yourMove: 'B', moveScore: 2, roundScore: 3},
        Z: {yourMove: 'C', moveScore: 3, roundScore: 6}
       },
       C: {
        X: {yourMove: 'B', moveScore: 2, roundScore: 0},
        Y: {yourMove: 'C', moveScore: 3, roundScore: 3},
        Z: {yourMove: 'A', moveScore: 1, roundScore: 6}
       }
   
    }
    getRoundScorePt2 = (roundInfo: string): number => {
        const [theirMove, outcome]  = roundInfo.split(' ')
        const yourMoveScore = this.movesPart2[theirMove][outcome].moveScore;
        const yourRoundScore = this.movesPart2[theirMove][outcome].roundScore;
        return yourMoveScore + yourRoundScore;
    }

    myTotalScorePt2 = 0

    solveForPartTwo(input: string): string {
        const data = this.splitByBlankLine(input);
        data.forEach((move) => {
            this.myTotalScorePt2 += this.getRoundScorePt2(move)
        })

        return this.myTotalScorePt2.toString();
    }
}

export default new Day2;