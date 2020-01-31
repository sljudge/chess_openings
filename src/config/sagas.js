import { takeEvery, select, call, put } from 'redux-saga/effects'
import { MOVE_PIECE, movePiece, castleKingSide, castleQueenSide } from '../actions/movePiece'
import { UPDATE_DATA, TOGGLE_PLAYER, RESET, SET_ALERT, TOGGLE_AUTO } from '../actions/updateData'
import createMatrix from '../helpers/createMatrix'
import isInCheck from '../helpers/isInCheck'
import constructFen from '../helpers/api/constructFen'
import getRandInt from '../helpers/converters/getRandInt'


const numberOfMoves = 6
const getMoves = (fen) => (fetch(`https://explorer.lichess.ovh/master?fen=${fen}&moves=${numberOfMoves}`))

function* movePieceAsync(action) {

    //Get data from state
    const data = yield select(state => state.data.present)
    const player = yield data.player

    //construct boardMatrix for reference
    const board = yield select(state => state.board.present)
    const boardMatrix = yield createMatrix(board)

    // construct fen for api call
    const castling = yield select(state => state.castling.present)
    const fen = yield constructFen(boardMatrix, board.toMove, castling, board.enPassant)

    //check for check mate
    yield isInCheck(board.toMove, boardMatrix)

    try {
        //attempt api call
        const response = yield call(getMoves, fen)
        const result = yield response.json()
        yield put({ type: UPDATE_DATA, result, toMove: board.toMove })
        //If it is the computer's turn (&& auto: true) then make random move from move list
        if (data.panel.auto && board.toMove !== player) {
            //If the fen is valid then move the piece
            if (result.moves.length > 0) {
                // const move = result.moves[getRandInt(result.moves.length)]
                const move = result.moves[0]
                let from = move.uci.slice(0, 2)
                let to = move.uci.slice(2)
                //Account for castling discrepancies with api
                if (from === 'e1' && to === 'h1') { yield put(castleKingSide('g1', board.toMove)) }
                else if (from === 'e8' && to === 'h8') { yield put(castleKingSide('g8', board.toMove)) }
                else if (from === 'e1' && to === 'a1') { yield put(castleQueenSide('c1', board.toMove)) }
                else if (from === 'e8' && to === 'a8') { yield put(castleKingSide('c8', board.toMove)) }
                else { yield put(movePiece(board.toMove, board[from], from, to)) }
            }
            //If the fen is not valid then show alert
            else {
                !data.alert && alert('No games in the database for this board position.')
                yield put({ type: SET_ALERT })
            }
        }


    } catch (e) {
        yield alert('API ERROR')
        console.log(e)
    }
}

export function* watcher() {
    yield takeEvery(MOVE_PIECE, movePieceAsync)
    yield takeEvery(TOGGLE_PLAYER, movePieceAsync)
    yield takeEvery(RESET, movePieceAsync)
    yield takeEvery(TOGGLE_AUTO, movePieceAsync)
}




