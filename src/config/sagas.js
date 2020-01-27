import { takeEvery, select, call, put } from 'redux-saga/effects'
import { MOVE_PIECE } from '../actions/movePiece'
import store from './store'
import createMatrix from '../helpers/createMatrix'
import isInCheck from '../helpers/isInCheck'



function* movePieceAsync(action) {
    // console.log('MOVE PIECE', action)
    const state = store.getState()
    const boardMatrix = createMatrix(state.board)

    isInCheck(state.board.toMove, boardMatrix)

}

export function* watchMovePiece() {
    // console.log('watching')
    yield takeEvery(MOVE_PIECE, movePieceAsync)
}



