export default function constructFen(boardMatrix, toPlay, castling, enPassant) {
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
    //Adjust for castling
    if (castling['white'].kingSide === null) fenStr += 'K'
    if (castling['white'].queenSide === null) fenStr += 'Q'
    if (castling['black'].kingSide === null) fenStr += 'k'
    if (castling['black'].queenSide === null) fenStr += 'q'
    if ([castling['white'].kingSide, castling['white'].queenSide, castling['black'].kingSide, castling['black'].queenSide].every(x => x !== null)) {
        fenStr += '--'
    }
    //adjust for en passant
    if (enPassant) fenStr += ` ${enPassant}`
    return fenStr
}


//CHECK

// r2qnrk1/3nbppp/3pb3/5PP1/p2NP3/4B3/PPpQ3P/3R1B1R w --
// r2qnrk1/3nbppp/3pb3/5PP1/p2NP3/4B3/PPpQ3P/1K1R1B1R w - - 0 2