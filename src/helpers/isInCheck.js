import createMatrix from './createMatrix'
import convertAlphToNum from './convertAlphToNum'
import convertNum from './convertNum'


function isInCheck(toMove, kingPosition, board, to) {
    const toX = convertAlphToNum(to[0])
    const toY = convertNum(to[1])
    const kingX = convertAlphToNum(kingPosition[0])
    const kingY = convertNum(kingPosition[1])

    const boardMatrix = createMatrix(board, true)

    const output = { boardMatrix }

    const checkForKnights = () => {
        const enemy = toMove === 'white' ? 'n' : 'N'
        const arr = []
        const possibleSquares = [
            [kingY - 2, kingX - 1],
            [kingY - 2, kingX + 1],
            [kingY - 1, kingX - 2],
            [kingY - 1, kingX + 2],
            [kingY + 1, kingX - 2],
            [kingY + 1, kingX + 2],
            [kingY + 2, kingX - 1],
            [kingY + 2, kingX + 1]
        ]
        for (let square of possibleSquares) {
            let y = square[0]
            let x = square[1]
            if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
                if (boardMatrix[y][x] == enemy) {
                    arr.push(square)
                }
            }
        }
        if (arr.length > 0) { output[enemy] = arr }
    }

    const checkForRooks = (queen = false) => {
        let enemy
        if (!queen) { enemy = toMove === 'white' ? 'r' : 'R' }
        else { enemy = toMove === 'white' ? 'q' : 'Q' }

        const arr = []
        let square

        //check left
        for (let i = kingX - 1; i >= 0; i--) {
            square = boardMatrix[kingY][i]
            if (square === enemy) { arr.push([kingY, i]) }
            else if (square !== 0) { i = -1 }
        }
        //check right
        for (let i = kingX + 1; i <= 7; i++) {
            square = boardMatrix[kingY][i]
            if (square === enemy) { arr.push([kingY, i]) }
            else if (square !== 0) { i = 8 }
        }
        //check up
        for (let i = kingY - 1; i >= 0; i--) {
            square = boardMatrix[i][kingX]
            if (square === enemy) { arr.push([i, kingX]) }
            else if (square !== 0) { i = -1 }
        }
        //check down
        for (let i = kingY + 1; i <= 7; i++) {
            square = boardMatrix[i][kingX]
            if (square === enemy) { arr.push([i, kingX]) }
            else if (square !== 0) { i = 8 }
        }
        if (arr.length > 0) { output[enemy] = arr }
    }

    const checkForBishops = (queen = false) => {
        let enemy
        if (!queen) { enemy = toMove === 'white' ? 'b' : 'B' }
        else { enemy = toMove === 'white' ? 'q' : 'Q' }

        const arr = []
        let square

        //check top left
        for (let y = kingY - 1, x = kingX - 1; y >= 0; y-- , x--) {
            square = boardMatrix[y][x]
            if (square === enemy) { arr.push([y, x]) }
            else if (square !== 0) { y = -1 }
        }
        //check top right
        for (let y = kingY - 1, x = kingX + 1; y >= 0; y-- , x++) {
            square = boardMatrix[y][x]
            if (square === enemy) { arr.push([y, x]) }
            else if (square !== 0) { y = -1 }
        }
        //check bottom left
        for (let y = kingY + 1, x = kingX - 1; y <= 7; y++ , x--) {
            square = boardMatrix[y][x]
            if (square === enemy) { arr.push([y, x]) }
            else if (square !== 0) { y = 8 }
        }
        //check bottom right
        for (let y = kingY + 1, x = kingX + 1; y <= 7; y++ , x++) {
            square = boardMatrix[y][x]
            if (square === enemy) { arr.push([y, x]) }
            else if (square !== 0) { y = 8 }
        }
        if (arr.length > 0) { output[enemy] = arr }
    }

    const checkForQueen = () => {
        checkForRooks(true)
        checkForBishops(true)
    }

    const checkForPawn = () => {
        if (toMove === 'white') {
            if (boardMatrix[kingY - 1][kingX - 1] === 'p') {
                output['p'] = [kingY - 1, kingX - 1]
            } else if (boardMatrix[kingY - 1][kingX + 1] === 'p') {
                output['p'] = [kingY - 1, kingX + 1]
            }
        } else {
            if (boardMatrix[kingY + 1][kingX - 1] === 'P') {
                outut['P'] = [kingY + 1, kingX - 1]
            } else if (boardMatrix[kingY + 1][kingX + 1] === 'P') {
                output['P'] = [kingY + 1, kingX + 1]
            }
        }
    }

    checkForKnights()
    checkForRooks()
    checkForBishops()
    checkForQueen()
    checkForPawn()
    return output
}

export default isInCheck