import { takeEvery, select, call, put } from 'redux-saga/effects'
import { SET_CHECK } from '../actions/setCheck'
import { SELECT_PIECE } from '../actions/movePiece'



function* selectPieceAsync(action) {
    console.log('SET CHECK', action)
    let id = action.id
    let attack = action.attack
    let kingPosition = action.kingPosition
    //If in check by two or more pieces then ensure that king is piece to move
    if (Object.keys(attack).length > 1 && id === kingPosition) {
        yield put({ type: SELECT_PIECE, id })
    }
    yield put({ type: SELECT_PIECE, id })
}

export function* watchSetCheck() {
    console.log('watching')
    yield takeEvery(SET_CHECK, selectPieceAsync)
}



