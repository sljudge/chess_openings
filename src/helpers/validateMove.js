import convertAlphToNum from './converters/convertAlphToNum'
import convertNum from './converters/convertNum'
import isInCheck from './isInCheck'
import createMatrix from './createMatrix'

function validateMove(board, castling, piece, from, to) {
    /**
     * Ensures pieces move correctly and then calls isInCheck to verify that the move does not put the player in check
     */

    // const piece = board[from]
    const color = piece === piece.toUpperCase() ? 'white' : 'black'
    //Co-ordinates
    const fromX = convertAlphToNum(from[0])
    const fromY = convertNum(from[1])
    const toX = convertAlphToNum(to[0])
    const toY = convertNum(to[1])
    //Matrix
    const boardMatrix = createMatrix(board)

    ///////////////////////////////////////    
    //////////     ROOK     /////////////
    ///////////////////////////////////////    

    const rookMoves = () => {
        // vertical move
        if (fromX === toX) {
            //up
            if (fromY > toY) {
                for (let i = fromY - 1; i > toY; i--) {
                    if (boardMatrix[i][fromX] !== 0) { return false }
                } return true
            }
            //down
            else if (fromY < toY) {
                for (let i = fromY + 1; i < toY; i++) {
                    if (boardMatrix[i][fromX] !== 0) { return false }
                } return true
            }
        }
        //horizontal move
        else if (fromY === toY) {
            //right
            if (fromX < toX) {
                for (let i = fromX + 1; i < toX; i++) {
                    if (boardMatrix[fromY][i] !== 0) { return false }
                } return true
            }
            //left
            else if (fromX > toX) {
                for (let i = fromX - 1; i > toX; --i) {
                    if (boardMatrix[fromY][i] !== 0) { return false }
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
        //check for straight diagonal
        if (Math.abs(toX - fromX) === Math.abs(toY - fromY)) {
            //check for collisions
            //right & down
            if (toX > fromX && toY > fromY) {
                for (let x = fromX + 1, y = fromY + 1; x < toX; x++ , y++) {
                    if (boardMatrix[y][x] !== 0) { return false }
                } return true
            }
            //left & down
            else if (toX < fromX && toY > fromY) {
                for (let x = fromX - 1, y = fromY + 1; x > toX; x-- , y++) {
                    if (boardMatrix[y][x] !== 0) { return false }
                } return true
            }
            //right & up
            else if (toX > fromX && toY < fromY) {
                for (let x = fromX + 1, y = fromY - 1; x < toX; x++ , y--) {
                    if (boardMatrix[y][x] !== 0) { return false }
                } return true
            }
            //left and up
            else if (toX < fromX && toY < fromY) {
                for (let x = fromX - 1, y = fromY - 1; x > toX; x-- , y--) {
                    if (boardMatrix[y][x] !== 0) { return false }
                } return true
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
        //NORMAL MOVE
        if (Math.abs(toX - fromX) <= 1 && Math.abs(toY - fromY) <= 1) {
            return true
        }
        //KING SIDE CASTLE
        if (castling[color].kingSide === null) {
            if (to === 'g1' || to === 'g8') {
                //check to see if way is clear 
                if (color === 'white' && [boardMatrix[7][5], boardMatrix[7][6]].every(x => x === 0) || color === 'black' && [boardMatrix[0][5], boardMatrix[0][6]].every(x => x === 0)) {
                    return {
                        castledKingSide: true
                    }
                }
            }
            return false
        }
        // QUEEN SIDE CASTLE
        else if (castling[color].queenSide === null) {
            if (to === 'c1' || to === 'c8') {
                //check to see if way is clear 
                if (color === 'white' && [boardMatrix[7][1], boardMatrix[7][2], boardMatrix[7][3]].every(x => x === 0) || color === 'black' && [boardMatrix[0][1], boardMatrix[0][2], boardMatrix[0][3]].every(x => x === 0)) {
                    return {
                        castledQueenSide: true
                    }
                }
            }
            return false
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
        if (board.enPassant === to) {
            //check only one ahead and one to side 
            return Math.abs(fromX - toX) === 1 && Math.abs(fromY - toY) === 1 ? { enPassant: true } : false
        }
        //NON-TAKING MOVE
        else if (fromX === toX && boardMatrix[toY][toX] === 0) {
            //double or single move
            if (color === 'white') {
                return fromY === 6 && toY === 4 || fromY - toY === 1 ? true : false
            } else {
                return fromY === 1 && toY === 3 || toY - fromY === 1 ? true : false
            }
        }
        //TAKING MOVE LEFT || RIGHT
        //check if there is a piece to take and adjacent
        else if (Math.abs(toX - fromX) === 1 && boardMatrix[toY][toX] !== 0) {
            //check only one ahead
            if (color === 'white') {
                return fromY - toY === 1 ? true : false
            } else {
                return toY - fromY === 1 ? true : false
            }
        }
        else {
            return false
        }
    }

    ////////////////////////////////////////////////////////////    
    ////////////////////     RETURN     ////////////////////////
    //////////////////////////////////////////////////////////// 

    const assignValuesToMatrix = () => {
        boardMatrix[toY][toX] = piece
        boardMatrix[fromY][fromX] = 0
    }
    //Move piece and verify if in check then return result
    switch (piece.toLowerCase()) {
        case 'r':
            if (rookMoves()) {
                assignValuesToMatrix()
                return isInCheck(color, boardMatrix) ? false : true
            } return false
        case 'n':
            if (knightMoves()) {
                assignValuesToMatrix()
                return isInCheck(color, boardMatrix) ? false : true
            } return false
        case 'b':
            if (bishopMoves()) {
                assignValuesToMatrix()
                return isInCheck(color, boardMatrix) ? false : true
            } return false;
        case 'q':
            if (queenMoves()) {
                assignValuesToMatrix()
                return isInCheck(color, boardMatrix) ? false : true
            } return false
        case 'k':
            let kingMove = kingMoves()
            //Normal move success
            if (kingMove === true) {
                assignValuesToMatrix()
                return isInCheck(color, boardMatrix) ? false : true
            }
            //Normal move fail
            else if (kingMove === false) {
                return false
            }
            //Castle King side (verifying if king crosses line of check)
            else if (kingMove.castledKingSide) {
                for (let x = 4; x < 7; x++) {
                    if (isInCheck(color, boardMatrix, [fromY, x])) { return false }
                }
                return { castledKingSide: true }
            }
            //Castle Queen side (verifying if king crosses line of check)
            else if (kingMove.castledQueenSide) {
                for (let x = 4; x > 0; x--) {
                    if (isInCheck(color, boardMatrix, [fromY, x])) { return false }
                }
                return { castledQueenSide: true }
            } return false
        case 'p':
            let pawnMove = pawnMoves()
            //Normal move success
            if (pawnMove === true) {
                assignValuesToMatrix()
                return isInCheck(color, boardMatrix) ? false : true
            }
            //Normal move fail
            else if (pawnMove === false) {
                return false
            }
            //En passant
            else if (pawnMove.enPassant) {
                assignValuesToMatrix()
                return isInCheck(color, boardMatrix) ? false : { enPassant: true }
            } return false

        default: return null
    }
}
export default validateMove