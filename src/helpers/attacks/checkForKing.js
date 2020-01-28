export default function checkForKing(toMove, Y, X, boardMatrix) {
    let enemy = toMove === 'white' ? 'k' : 'K'

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
    let y, x
    for (let square of possibleSquares) {
        y = square[0]
        x = square[1]
        //within confines of board
        if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
            if (boardMatrix[y][x] === enemy) { return [y, x] }
        }
    }
}