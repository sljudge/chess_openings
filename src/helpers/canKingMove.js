import isInCheck from './isInCheck'

export default function canKingMove(toMove, Y, X, boardMatrix) {
    boardMatrix[Y][X] = 0
    const possibleSquares = [
        [Y - 1, X - 1],
        [Y - 1, X],
        [Y - 1, X + 1],
        [Y, X - 1],
        [Y, X + 1],
        [Y + 1, X - 1],
        [Y + 1, X],
        [Y + 1, X + 1],
    ]
    let y, x, targetSquare
    for (let square of possibleSquares) {
        y = square[0]
        x = square[1]
        //within confines of board
        if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
            targetSquare = boardMatrix[y][x]
            //target is either enemy piece or empty square
            if (targetSquare === 0 || toMove === 'white' && targetSquare === targetSquare.toLowerCase() || toMove === 'black' && targetSquare === targetSquare.toUpperCase()) {
                //target square is free from check
                if (isInCheck(toMove, boardMatrix, [y, x], true) === false) { return true }
            }
        }
    }
    return false
}