import isInCheck from './isInCheck'

export default function attackCanBeBlockedOrTaken(toMove, Y, X, boardMatrix, attacks) {
    /**
     * Determine if any attacks can be blocked or taken. If attacks can be stopped eliminate corresponding category from output.
     * Go through each square and apply isInCheck to determine if square can be reached by opposing piece
     */
    const blockerColor = toMove === 'white' ? 'black' : 'white'
    const perpendicular = attacks.perpendicular
    const diagonal = attacks.diagonal
    const knight = attacks.knight
    const pawn = attacks.pawn

    const output = { perpendicular, diagonal, knight, pawn }

    const canPawnBlock = (y, x) => {
        //check square is empty
        if (boardMatrix[y][x] !== 0) { return false }
        //see if pawn can block attack
        if (toMove === 'white') {
            if (y === 4 && boardMatrix[6][x] === 'P') { return true }
            else if (boardMatrix[y + 1][x] === 'P') { return true }
        } else {
            if (y === 3 && boardMatrix[1][x] === 'p') { return true }
            else if (boardMatrix[y - 1][x] === 'p') { return true }
        }
        return false
    }

    let x, y
    if (perpendicular) {
        y = perpendicular[0]
        x = perpendicular[1]
        //UP
        if (Y < y) {
            for (let i = y; i > Y; i--) {
                if (canPawnBlock(i, x)) { return true }
                if (isInCheck(blockerColor, boardMatrix, [i, x])) { delete output.perpendicular; break }
            }
        }
        //DOWN
        else if (Y > y) {
            for (let i = y; i < Y; i++) {
                if (canPawnBlock(i, x)) { return true }
                if (isInCheck(blockerColor, boardMatrix, [i, x])) { delete output.perpendicular; break }
            }
        }
        //RIGHT
        else if (X > x) {
            for (let i = x; i < X; i++) {
                if (canPawnBlock(i, x)) { return true }
                if (isInCheck(blockerColor, boardMatrix, [y, i])) { delete output.perpendicular; break }
            }
        }
        //LEFT
        else if (X < x) {
            for (let i = x; i > X; i--) {
                if (canPawnBlock(i, x)) { return true }
                if (isInCheck(blockerColor, boardMatrix, [y, i])) { delete output.perpendicular; break }
            }
        }
    }
    if (diagonal) {
        y = diagonal[0]
        x = diagonal[1]
        //UP & LEFT
        if (Y < y && X < x) {
            for (let i = y, j = x; i > Y; i-- , j--) {
                if (canPawnBlock(i, j)) { return true }
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //UP & RIGHT
        else if (Y < y && X > x) {
            for (let i = y, j = x; i > Y; i-- , j++) {
                if (canPawnBlock(i, j)) { return true }
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //DOWN & LEFT
        else if (Y > y && X < x) {
            for (let i = y, j = x; i < Y; i++ , j--) {
                if (canPawnBlock(i, j)) { return true }
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //DOWN & RIGHT
        else if (Y > y && X > x) {
            for (let i = y, j = x; i < Y; i++ , j++) {
                if (canPawnBlock(i, j)) { return true }
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
    }
    if (knight) {
        x = knight[1]
        y = knight[0]
        if (isInCheck(blockerColor, boardMatrix, [y, x])) { delete output.knight }
    }
    if (pawn) {
        x = pawn[1]
        y = pawn[0]
        if (isInCheck(blockerColor, boardMatrix, [y, x])) { delete output.pawn }
    }


    return Object.values(output).every(x => x === null)
}