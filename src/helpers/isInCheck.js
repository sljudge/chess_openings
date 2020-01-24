import createMatrix from './createMatrix'
import convertAlphToNum from './convertAlphToNum'
import convertNum from './convertNum'


function isInCheck(toMove, kingPosition, board, to) {
    console.log('KING POSITION:', kingPosition, 'TO:', to)
    const toX = convertAlphToNum(to[0])
    const toY = convertNum(to[1])
    const kingX = convertAlphToNum(kingPosition[0])
    const kingY = convertNum(kingPosition[1])
    console.log('KING: ', `[${kingY},${kingX}]`)

    const boardMatrix = createMatrix(board, true)
    console.log(boardMatrix)

    const output = {}

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
    checkForKnights()
    return output
}

export default isInCheck