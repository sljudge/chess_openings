export default function checkForPawn(toMove, Y, X, boardMatrix) {
    if (Y <= 7 && Y >= 0 && X <= 7 && X >= 0) {
        if (toMove === 'white') {
            if (boardMatrix[Y - 1][X - 1] === 'p') {
                return [Y - 1, X - 1]
            } else if (boardMatrix[Y - 1][X + 1] === 'p') {
                return [Y - 1, X + 1]
            }
        } else {
            if (boardMatrix[Y + 1][X - 1] === 'P') {
                return [Y + 1, X - 1]
            } else if (boardMatrix[Y + 1][X + 1] === 'P') {
                return [Y + 1, X + 1]
            }
        }
    }
}