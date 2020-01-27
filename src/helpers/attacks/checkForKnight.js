export default function checkForKnight(toMove, Y, X, boardMatrix) {
    const enemy = toMove === 'white' ? 'n' : 'N'
    const possibleSquares = [
        [Y - 2, X - 1],
        [Y - 2, X + 1],
        [Y - 1, X - 2],
        [Y - 1, X + 2],
        [Y + 1, X - 2],
        [Y + 1, X + 2],
        [Y + 2, X - 1],
        [Y + 2, X + 1]
    ]
    for (let square of possibleSquares) {
        let y = square[0]
        let x = square[1]
        if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
            if (boardMatrix[y][x] == enemy) {
                return square
            }
        }
    }
}