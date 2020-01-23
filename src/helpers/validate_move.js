const board = {
    a8: 'r', b8: 'n', c8: 'b', d8: 'q', e8: 'k', f8: 'b', g8: 'n', h8: 'r',
    a7: 'p', b7: 'p', c7: 'p', d7: 'p', e7: 'p', f7: 'p', g7: 'p', h7: 'p',
    a6: null, b6: null, c6: null, d6: null, e6: null, f6: null, g6: null, h6: null,
    a5: null, b5: null, c5: null, d5: null, e5: null, f5: null, g5: null, h5: null,
    a4: null, b4: null, c4: null, d4: null, e4: null, f4: null, g4: null, h4: null,
    a3: null, b3: null, c3: null, d3: null, e3: null, f3: null, g3: null, h3: null,
    a2: 'P', b2: 'P', c2: 'P', d2: 'P', e2: 'P', f2: 'P', g2: 'P', h2: 'P',
    a1: 'R', b1: 'N', c1: 'B', d1: 'Q', e1: 'K', f1: 'B', g1: 'N', h1: 'R',
}

const convertAlphToNum = (letter) => {
    switch (letter.toLowerCase()) {
        case 'a': return 0
        case 'b': return 1
        case 'c': return 2
        case 'd': return 3
        case 'e': return 4
        case 'f': return 5
        case 'g': return 6
        case 'h': return 7
    }
}
const convertNum = (number) => {
    switch (number) {
        case '1': return 7
        case '2': return 6
        case '3': return 5
        case '4': return 4
        case '5': return 3
        case '6': return 2
        case '7': return 1
        case '8': return 0
    }
}


function validateMove(board, piece, from, to) {
    console.log(piece, from, to)
    const white = piece === piece.toUpperCase() ? true : false
    const fromX = convertAlphToNum(from[0])
    const fromY = convertNum(from[1])
    const toX = convertAlphToNum(to[0])
    const toY = convertNum(to[1])

    const boardMatrix = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
    ]

    const populateMatrix = (board) => {
        const keys = Object.keys(board)
        for (let i = 0, j = 0; i < 64; i++) {
            if (i > 0 && i % 8 === 0) {
                j++
            }
            const key = keys[i]
            boardMatrix[j][i % 8] = board[key] === null ? 0 : 1
        }
        console.log(boardMatrix)
    }
    console.log(populateMatrix(board))

    const rookMoves = () => {
        // vertical move
        if (fromX === toX) {
            console.log('rook vertical')
            //up
            if (fromY > toY) {
                console.log('rook up')
                for (let i = fromY - 1; i > toY; i--) {
                    console.log(i)
                    if (boardMatrix[i][fromX] === 1) {
                        return false
                    }
                } return true
            }
            //down
            else if (fromY < toY) {
                console.log('rook down')
                for (let i = fromY + 1; i < toY; i++) {
                    if (boardMatrix[i][fromX] === 1) {
                        return false
                    }
                } return true
            }
        }
        //horizontal move
        else if (fromY === toY) {
            //right
            if (fromX < toX) {
                for (let i = fromX + 1; i < toX; i++) {
                    if (boardMatrix[fromY][i] === 1) {
                        return false
                    }
                } return true
            }
            //left
            else if (fromX > toX) {
                for (let i = fromX - 1; i > toX; i--) {
                    if (boardMatrix[fromX][i] === 1) {
                        return false
                    }
                } return true
            }
        } else {
            return false
        }
    }

    const pawnMoves = () => {
        /*
            Complete except en passant
        */
        //Non-taking move
        if (fromX === toX) {
            //check if to square is occupied
            if (boardMatrix[toY][toX] !== 1) {
                //double or single move
                if (white) {
                    if (fromY === 6 && toY === 4) {
                        return true
                    } else if (fromY - toY === 1) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (fromY === 1 && toY === 3) {
                        return true
                    } else if (toY - fromY === 1) {
                        return true
                    } else {
                        return false
                    }
                }
            } else {
                return false
            }
        }
        //taking move - right || left
        else if (toX - fromX === 1 && fromX < 7 || fromX - toX === 1 && fromX > 0) {
            //check if there is a piece to take
            if (boardMatrix[toY][toX] === 1) {
                //check only one ahead
                if (white) {
                    return fromY - toY === 1 ? true : false
                } else {
                    return toY - fromY === 1 ? true : false
                }
            } else {
                return false
            }
        }
        else {
            return false
        }
    }
    console.log(pawnMoves())


    switch (piece.toLowerCase()) {
        case 'r': return rookMoves(boardMatrix, piece, from, to)
        case 'n': return knightMoves(boardMatrix, piece, from, to)
        case 'b': return bishopMoves(boardMatrix, piece, from, to)
        case 'q': return queenMoves(boardMatrix, piece, from, to)
        case 'k': return kingMoves(boardMatrix, piece, from, to)
        case 'p': return pawnMoves(boardMatrix, piece, from, to)
        default: return null
    }

}

console.log(validateMove(board, 'p', 'a2', 'a4'))

export default validateMove