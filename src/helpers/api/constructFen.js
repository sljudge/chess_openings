export default function constructFen(boardMatrix, toPlay, castling) {
    // console.log('---------FEN-----------')
    let fenStr = ''
    let nullCount = 0
    let char
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            char = boardMatrix[i][j]
            if (char !== 0) {
                if (nullCount > 0) { fenStr += nullCount; nullCount = 0 }
                fenStr += char
            }
            else { nullCount++ }
        }
        if (nullCount > 0) { fenStr += nullCount; nullCount = 0 }
        if (i < 7) { fenStr += '/' }
    }
    fenStr += toPlay === 'white' ? ' w ' : ' b '
    if (castling['white'].kingSide === null) fenStr += 'K'
    if (castling['white'].queenSide === null) fenStr += 'Q'
    if (castling['black'].kingSide === null) fenStr += 'k'
    if (castling['black'].queenSide === null) fenStr += 'q'
    return fenStr
}