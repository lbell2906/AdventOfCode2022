import { Day } from "../day";

class Day5 extends Day {

    constructor(){
        super(5);
    }
    splitByLine = (input: string): Array<string> => input.split('\n')
    

    solveForPartOne(input: string): string {
        const data = this.splitByLine(input)
        const containers :Array<Array<string>> = [['N', 'D', 'M', 'Q', 'B', 'P', 'Z'], ['C', 'L', 'Z', 'Q', 'M', 'D', 'H', 'V'], ['Q', 'H', 'R', 'D', 'V', 'F', 'Z', 'G'], ['H', 'G', 'D', 'F', 'N'], ['N', 'F', 'Q'], ['D', 'Q', 'V', 'Z', 'F', 'B', 'T'], ['Q', 'M', 'T', 'Z', 'D', 'V', 'S', 'H'], ['M', 'G', 'F', 'P', 'N', 'Q'],  ['B', 'W', 'R', 'M']]
        const moves = data.slice(10)
        moves.forEach((move, index) => {
            // if (index < 3) {
            const moveSplit = move.split(' ')
            const numberOfContaienrs = parseInt(moveSplit[1])
            const from =  parseInt(moveSplit[3]) - 1
            const to = parseInt(moveSplit[5]) - 1
            const allCotainers = containers[from] ?? []
            const targetContainers = allCotainers.slice(allCotainers.length - numberOfContaienrs)
            const remainderContainers = allCotainers.slice(0, allCotainers.length - numberOfContaienrs)
            containers[from] = remainderContainers
            const targetStack = containers[to] ?? []
            containers[to] = targetStack.concat(targetContainers)
        //     console.log("number of containers to move", numberOfContaienrs)
        //     console.log("all containers in stack index", from ,allCotainers)
        //     console.log("to stack", to)
        //     console.log('targets containers', (allCotainers.length - numberOfContaienrs), targetContainers)
        //     console.log(containers)
        // }
        })
        console.log(containers)
        return containers.flatMap((stack) => (stack[stack.length - 1])).join()
    }

    solveForPartTwo(input: string): string {
        return input;
    }
}

export default new Day5;