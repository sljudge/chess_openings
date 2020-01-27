export default function checkDiagonal(toMove, Y, X, boardMatrix) {
    let enemy = toMove === 'white' ? ['q', 'b'] : ['Q', 'B']

    let square

    //check top left
    for (let y = Y - 1, x = X - 1; y >= 0; y-- , x--) {
        square = boardMatrix[y][x]
        if (enemy.includes(square)) { return [y, x] }
        else if (square !== 0) { y = -1 }
    }
    //check top right
    for (let y = Y - 1, x = X + 1; y >= 0; y-- , x++) {
        square = boardMatrix[y][x]
        if (enemy.includes(square)) { return [y, x] }
        else if (square !== 0) { y = -1 }
    }
    //check bottom left
    for (let y = Y + 1, x = X - 1; y <= 7; y++ , x--) {
        square = boardMatrix[y][x]
        if (enemy.includes(square)) { return [y, x] }
        else if (square !== 0) { y = 8 }
    }
    //check bottom right
    for (let y = Y + 1, x = X + 1; y <= 7; y++ , x++) {
        square = boardMatrix[y][x]
        if (enemy.includes(square)) { return [y, x] }
        else if (square !== 0) { y = 8 }
    }
}
