import convertAlphToNum from './convertAlphToNum'
import convertNum from './convertNum'

function validateMove(board, piece, from, to) {
    console.log(piece, from, to)
    //Color
    const color = piece === piece.toUpperCase() ? 'white' : 'black'
    //Co-ordinates
    const fromX = convertAlphToNum(from[0])
    const fromY = convertNum(from[1])
    const toX = convertAlphToNum(to[0])
    const toY = convertNum(to[1])
    //Special cases
    const { check, enPassant, castle } = { ...board }

    console.log('CHECK: ', check)
    console.log('EN PASSANT: ', enPassant)
    console.log('CASTLE: ', castle)
    console.log('____________________________________')


    ///////////////////////////////////////    
    //////////     MATRIX     /////////////
    ///////////////////////////////////////    
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
    }

    ///////////////////////////////////////    
    //////////     ROOK     /////////////
    ///////////////////////////////////////    

    const rookMoves = () => {
        // vertical move
        if (fromX === toX) {
            //up
            if (fromY > toY) {
                for (let i = fromY - 1; i > toY; i--) {
                    if (boardMatrix[i][fromX] === 1) {
                        return false
                    }
                } return true
            }
            //down
            else if (fromY < toY) {
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
                for (let i = fromX - 1; i > toX; --i) {
                    if (boardMatrix[fromY][i] === 1) {
                        return false
                    }
                } return true
            }
        } else {
            return false
        }
    }

    ///////////////////////////////////////    
    //////////     KNIGHT     /////////////
    ///////////////////////////////////////    

    const knightMoves = () => {
        const possibleMoves = [
            [fromX - 2, fromY - 1],
            [fromX - 2, fromY + 1],
            [fromX - 1, fromY - 2],
            [fromX - 1, fromY + 2],
            [fromX + 1, fromY - 2],
            [fromX + 1, fromY + 2],
            [fromX + 2, fromY - 1],
            [fromX + 2, fromY + 1]
        ]
        for (let move of possibleMoves) {
            if (move[0] === toX && move[1] === toY) {
                return true
            }
        }
        return false
    }

    ///////////////////////////////////////    
    //////////     BISHOP     /////////////
    ///////////////////////////////////////    

    const bishopMoves = () => {
        //check for straight diagonal: right & down || left & down || right & up || left & up
        if (Math.abs(toX - fromX) === Math.abs(toY - fromY) || Math.abs(fromX - toX) === Math.abs(toY - fromY)) {
            //check for collisions
            //right & down
            if (toX > fromX && toY > fromY) {
                for (let x = fromX + 1, y = fromY + 1; x < toX; x++ , y++) {
                    if (boardMatrix[y][x] === 1) {
                        return false
                    }
                } return true
            }
            //left & down
            else if (toX < fromX && toY > fromY) {
                for (let x = fromX - 1, y = fromY + 1; x > toX; x-- , y++) {
                    if (boardMatrix[y][x] === 1) {
                        return false
                    }
                } return true
            }
            //right & up
            else if (toX > fromX && toY < fromY) {
                for (let x = fromX + 1, y = fromY - 1; x < toX; x++ , y--) {
                    if (boardMatrix[y][x] === 1) {
                        return false
                    }
                } return true
            }
            //left and up
            else if (toX < fromX && toY < fromY) {
                for (let x = fromX - 1, y = fromY - 1; x > toX; x-- , y--) {
                    if (boardMatrix[y][x] === 1) {
                        return false
                    }
                } return true
            } else {
                return false
            }
        } else {
            return false
        }
    }

    ///////////////////////////////////////    
    //////////     QUEEN     /////////////
    ///////////////////////////////////////    

    const queenMoves = () => {
        if (rookMoves() || bishopMoves()) {
            return true
        } else {
            return false
        }
    }

    ///////////////////////////////////////    
    //////////     KING     /////////////
    ///////////////////////////////////////    

    const kingMoves = () => {
        if (Math.abs(toX - fromX) <= 1 && Math.abs(toY - fromY) <= 1) {
            return true
        }
        //KING SIDE CASTLE
        else if (to === 'g1' || to === 'g8' && castle[color].kingSide === null) {
            //check to see if way is clear *****NEED TO ADD LINE OF CHECK
            if (color === 'white' && [boardMatrix[7][5], boardMatrix[7][6]].every(x => x === 0) || color === 'black' && [boardMatrix[0][5], boardMatrix[0][6]].every(x => x === 0)) {
                // update special cases and return response
                return {
                    castledKingSide: true
                }
            }
        }
        // QUEEN SIDE CASTLE
        else if (to === 'c1' || to === 'c8' && castle[color].queenSide === null) {
            //check to see if way is clear *****NEED TO ADD LINE OF CHECK
            if (color === 'white' && [boardMatrix[7][1], boardMatrix[7][2], boardMatrix[7][3]].every(x => x === 0) || color === 'black' && [boardMatrix[0][1], boardMatrix[0][2], boardMatrix[0][3]].every(x => x === 0)) {
                return {
                    castledQueenSide: true
                }
            }
        }
        else {
            return false
        }
    }

    ///////////////////////////////////////    
    //////////     PAWN     /////////////
    ///////////////////////////////////////    

    const pawnMoves = () => {
        //EN PASSANT
        if (enPassant === to) {
            //check only one ahead
            if (color === 'white') {
                return fromY - toY === 1 && Math.abs(fromX - toX) === 1 ? { enPassant: true } : false
            } else {
                return toY - fromY === 1 && Math.abs(fromX - toX) === 1 ? { enPassant: true } : false
            }
        }
        //NON-TAKING MOVE
        else if (fromX === toX) {
            //check if to square is occupied
            if (boardMatrix[toY][toX] !== 1) {
                //double or single move
                if (color === 'white') {
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
        //TAKING MOVE LEFT || RIGHT
        else if (Math.abs(toX - fromX) === 1) {
            //check if there is a piece to take
            if (boardMatrix[toY][toX] === 1) {
                //check only one ahead
                if (color === 'white') {
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

    ////////////////////////////////////////////////////////////    
    ////////////////////     RETURN     ////////////////////////
    //////////////////////////////////////////////////////////// 

    populateMatrix(board)

    const inCheck = () => {
        const kingPosition = board.check[color].kingPosition
        let temp = Array.from(boardMatrix)
        console.log(toY, toX)
        console.log(temp === boardMatrix)
        temp[toY][toX] = 1
        // temp[fromY][fromX] = 0
        console.log('temp', temp)
        console.log(kingPosition)
        console.log('board matrix', boardMatrix)
    }
    console.log(inCheck())


    switch (piece.toLowerCase()) {
        case 'r':
            return rookMoves(boardMatrix, piece, from, to);
        case 'n':
            return knightMoves(boardMatrix, piece, from, to);
        case 'b':
            return bishopMoves(boardMatrix, piece, from, to);
        case 'q':
            return queenMoves(boardMatrix, piece, from, to);
        case 'k':
            return kingMoves(boardMatrix, piece, from, to);
        case 'p':
            return pawnMoves(boardMatrix, piece, from, to);
        default: return null
    }

}
export default validateMove