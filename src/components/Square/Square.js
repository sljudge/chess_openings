import React from 'react'
import styles from './styles'
import { css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { movePiece, selectPiece, castleKingSide, castleQueenSide, enPassant } from '../../actions/movePiece'
import validateMove from '../../helpers/validateMove'


const Square = props => {
    /////////////// PROPS   ////////////////////////////
    const { id, squareColorStr, pieceStr, selectPiece, movePiece, castleKingSide, castleQueenSide, enPassant, board, castling, data } = { ...props }
    /////////////// BOARD   ////////////////////////////
    const squareColor = squareColorStr === 'white' ? '#e4e8d2' : '#c4cf92'
    const from = board.selected //Moving from (...) 
    const to = id //Moving to (...)
    const toMove = board.toMove //White or black to move
    /////////////// PIECES   ////////////////////////////
    const piece = board[from] //Current piece selected
    const targetPiece = board[id]// Piece being targeted on move

    const tryMovePiece = () => {
        if (piece !== null && piece !== undefined) {
            const pieceColor = piece.toUpperCase() === piece ? 'white' : 'black'
            //check if it's the correct player to go
            if (toMove === pieceColor) {
                //you can't take your own color
                if (targetPiece === null || pieceColor === 'white' && targetPiece.toLowerCase() === targetPiece || pieceColor === 'black' && targetPiece.toUpperCase() === targetPiece) {
                    // ensure pieces move as they should and get response -> true/false/kingSide/queenSide/enPassant
                    let response = validateMove(board, castling, piece, from, to)
                    //SUCCESS
                    if (response === true) { movePiece(toMove, piece, from, to) }
                    // FAILED
                    else if (response === false) { console.log('THIS PIECE CANNOT BE MOVED THERE') }
                    // CASTLE KING SIDE
                    else if (response.castledKingSide) { castleKingSide(to, toMove) }
                    // CASTLE QUEEN SIDE
                    else if (response.castledQueenSide) { castleQueenSide(to, toMove) }
                    //EN PASSANT
                    else if (response.enPassant) { enPassant(from, to, toMove) }
                }
            }
        }

    }

    let type, typeColor
    if (pieceStr !== null) {
        typeColor = pieceStr === pieceStr.toUpperCase() ? '#808080' : '#1e1e1e'
        switch (pieceStr.toLowerCase()) {
            case 'r': type = (
                <div className={css(styles.piece)} style={data.player === 'black' ? { transform: 'rotate(180deg)' } : {}}>
                    <i className="fas fa-chess-rook" style={{ color: typeColor }} onClick={() => selectPiece(id)} />
                </div>
            ); break;
            case 'n': type = (
                <div className={css(styles.piece)} style={data.player === 'black' ? { transform: 'rotate(180deg)' } : {}}>
                    <i className="fas fa-chess-knight" style={{ color: typeColor }} onClick={() => selectPiece(id)} />
                </div>
            ); break;
            case 'b': type = (
                <div className={css(styles.piece)} style={data.player === 'black' ? { transform: 'rotate(180deg)' } : {}}>
                    <i className="fas fa-chess-bishop" style={{ color: typeColor }} onClick={() => selectPiece(id)} />
                </div>
            ); break;
            case 'q': type = (
                <div className={css(styles.piece)} style={data.player === 'black' ? { transform: 'rotate(180deg)' } : {}}>
                    <i className="fas fa-chess-queen" style={{ color: typeColor }} onClick={() => selectPiece(id)} />
                </div>
            ); break;
            case 'k': type = (
                <div className={css(styles.piece)} style={data.player === 'black' ? { transform: 'rotate(180deg)' } : {}}>
                    <i className="fas fa-chess-king" style={{ color: typeColor }} onClick={() => selectPiece(id)} />
                </div>
            ); break;
            case 'p': type = (
                <div className={css(styles.piece)} style={data.player === 'black' ? { transform: 'rotate(180deg)' } : {}}>
                    <i className="fas fa-chess-pawn" style={{ color: typeColor }} onClick={() => selectPiece(id)} />
                </div>
            ); break;
            default: null
        }
    }
    /////////////////////////////////////////////
    //ASSIGN COLORING FOR SELECT AND TEACH MODE//
    /////////////////////////////////////////////
    let squareStyle
    //////SELECT////
    if (pieceStr && id === board.selected) {
        //AUTO
        if (board.toMove === 'white' && data.player === 'white' && pieceStr.toUpperCase() === pieceStr || board.toMove === 'black' && data.player === 'black' && pieceStr.toLowerCase() === pieceStr) {
            squareStyle = { backgroundColor: 'rgb(55, 146, 203, 0.6)' }
        }
        //AUTO OFF
        else if (!data.panel.auto) {
            if (board.toMove === 'white' && pieceStr.toUpperCase() === pieceStr || board.toMove === 'black' && pieceStr.toLowerCase() === pieceStr) {
                squareStyle = { backgroundColor: 'rgb(55, 146, 203, 0.6)' }
            }
        }
    }
    //TEACHER MODE
    if (data.panel.teacher && id !== board.selected) {
        let highlightColor, placesToMove, piecesToMove
        //AUTO
        if (data.panel.auto && board.toMove === data.player) {
            placesToMove = data[data.player].map(move => move.uci.slice(2))
            piecesToMove = data[data.player].map(move => move.uci.slice(0, 2))
        }
        // AUTO OFF
        else if (!data.panel.auto) {
            placesToMove = data[board.toMove].map(move => move.uci.slice(2))
            piecesToMove = data[board.toMove].map(move => move.uci.slice(0, 2))
        }
        //ASSIGNMENT OF COLORS
        if (placesToMove && placesToMove.indexOf(id) !== -1) {
            // highlightColor = board[id] === null ? '#39ff14' : 'rgba(250,22,6, 1)'
            squareStyle = { boxShadow: `inset 0 0 1rem #39ff14` }
        }
        if (piecesToMove && piecesToMove.indexOf(id) !== -1) {
            squareStyle = { boxShadow: 'inset 0 0 1rem rgba(239, 250, 27, 1)' }
        }
    }

    return (
        <div
            id={id}
            className={css(styles.square)}
            style={{ backgroundColor: squareColor, ...squareStyle }}
            onClick={() => tryMovePiece()}
        >
            {type}
        </div >
    )
}

const mapStateToProps = (state) => {
    return {
        board: state.board.present,
        castling: state.castling.present,
        data: state.data.present
    }
}
const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        selectPiece,
        movePiece,
        castleKingSide,
        castleQueenSide,
        enPassant,
    }, dispatch)
}
const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    return { ...propsFromState, ...propsFromDispatch, ...ownProps }
}

export default connect(mapStateToProps, mapActionsToProps, mergeProps)(Square)