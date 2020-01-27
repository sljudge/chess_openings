import isInCheck from './isInCheck'

export default function canKingMove(toMove, Y, X, boardMatrix) {
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
    let y, x, targetPiece, kingCanMove = false
    for (let square of possibleSquares) {
        y = square[0]
        x = square[1]
        //within confines of board
        if (x >= 0 && y >= 0 && x <= 7 && y <= 7) {
            targetPiece = boardMatrix[y][x]
            //target is either enemy piece or empty square

            if (targetPiece === 0 || toMove === 'white' && targetPiece === targetPiece.toLowerCase() || toMove === 'black' && targetPiece === targetPiece.toUpperCase()) {
                //target square is free from check
                if (isInCheck(toMove, boardMatrix, [y, x]) === false) {
                    kingCanMove = true
                }
            }
        }
    }
    return kingCanMove
}