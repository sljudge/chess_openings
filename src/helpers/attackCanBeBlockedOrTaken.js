import isInCheck from './isInCheck'

export default function attackCanBeBlockedOrTaken(toMove, Y, X, boardMatrix, attacks) {
    /**
     * Determine if any attacks can be blocked or taken. If attacks can be stopped eliminate corresponding category from output.
     */
    const blockerColor = toMove === 'white' ? 'black' : 'white'
    const perpendicular = attacks.perpendicular
    const diagonal = attacks.diagonal
    const knight = attacks.knight
    const pawn = attacks.pawn

    const output = { perpendicular, diagonal, knight, pawn }

    console.log('input', output)
    // console.log('blocker color', blockerColor)

    let x, y
    if (perpendicular) {
        y = perpendicular[0]
        x = perpendicular[1]
        //UP
        if (Y < y) {
            for (let i = y; i > Y; i--) {
                // console.log([i, x])
                if (isInCheck(blockerColor, boardMatrix, [i, x])) { delete output.perpendicular; break }
            }
        }
        //DOWN
        else if (Y > y) {
            for (let i = y; i < Y; i++) {
                // console.log([i, x])
                if (isInCheck(blockerColor, boardMatrix, [i, x])) { delete output.perpendicular; break }
            }
        }
        //RIGHT
        else if (X > x) {
            for (let i = x; i < X; i++) {
                // console.log([y, i])
                if (isInCheck(blockerColor, boardMatrix, [y, i])) { delete output.perpendicular; break }
            }
        }
        //LEFT
        else if (X < x) {
            for (let i = x; i > X; i--) {
                // console.log([y, i])
                if (isInCheck(blockerColor, boardMatrix, [y, i])) { delete output.perpendicular; break }
            }
        }
    }
    if (diagonal) {
        y = diagonal[0]
        x = diagonal[1]
        // console.log('diagonal', [y, x])
        //UP & LEFT
        if (Y < y && X < x) {
            for (let i = y, j = x; i > Y; i-- , j--) {
                // console.log([i, j])
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //UP & RIGHT
        else if (Y < y && X > x) {
            for (let i = y, j = x; i > Y; i-- , j++) {
                // console.log([i, j])
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //DOWN & LEFT
        else if (Y > y && X < x) {
            for (let i = y, j = x; i < Y; i++ , j--) {
                // console.log([i, j])
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
        //DOWN & RIGHT
        else if (Y > y && X > x) {
            for (let i = y, j = x; i < Y; i++ , j++) {
                // console.log([i, j])
                if (isInCheck(blockerColor, boardMatrix, [i, j])) { delete output.diagonal; break }
            }
        }
    }
    if (knight) {
        x = knight[1]
        y = knight[0]
        // console.log('knight', [y, x])
        if (isInCheck(blockerColor, boardMatrix, [y, x])) { delete output.knight }
    }
    if (pawn) {
        x = pawn[1]
        y = pawn[0]
        // console.log('pawn', [y, x])
        if (isInCheck(blockerColor, boardMatrix, [y, x])) { delete output.pawn }
    }

    // console.log(output)

    return Object.values(output).every(x => x === null)
}