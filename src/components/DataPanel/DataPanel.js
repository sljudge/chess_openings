import React from 'react'
import styles from './styles'
import { css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { togglePanel, toggleAuto, toggleAutoHover, togglePlayer, reset, toggleTeacher } from '../../actions/updateData'


const DataPanel = (props) => {
    const { data, toMove, canUndo, canRedo, undo, redo, togglePanel, toggleAuto, togglePlayer, reset, toggleTeacher } = { ...props }
    const panelOpenOrClosed = data.panel.open && styles.panelWrapperOpen

    const autoIconOn = (
        <i className="fas fa-play-circle" ></i>
    )
    const autoIconOff = (
        <i className="fas fa-stop-circle" ></i>
    )

    const onUndo = () => {
        if (canUndo) {
            undo()
            data.panel.auto && toggleAuto()
        }
    }
    const onRedo = () => {
        if (canRedo) {
            redo()
            data.panel.auto && toggleAuto()
        }
    }

    return (
        <>
            {/*--------------- OPEN/CLOSE -----------------*/}
            {
                data.panel.open ?
                    <div className={css(styles.btn)} style={{ right: 'calc(50% - 4.5rem)' }} onClick={() => togglePanel()}><i className="fas fa-chevron-right"></i></div>
                    :
                    <div className={css(styles.btn)} style={{ right: '0' }} onClick={() => togglePanel()}><i className="fas fa-cog"></i></div>
            }
            <div className={css(styles.panelWrapper, panelOpenOrClosed)}>
                <div className={css(styles.panel)}>
                    <div className={css(styles.config)}>
                        {/*--------------- CONFIG -----------------*/}
                        <div
                            className={css(styles.switch, data.player === 'white' ? styles.switchWhite : styles.switchBlack)}
                            onClick={togglePlayer}
                        >
                            <i className="fas fa-chess-knight"></i>
                        </div>
                        <div
                            className={css(styles.switch, data.panel.auto ? styles.switchAutoOn : styles.switchAutoOff)}
                            onClick={() => toggleAuto()}
                        >
                            {data.panel.auto ? autoIconOn : autoIconOff}
                        </div>
                        <div
                            className={css(styles.switch, data.panel.teacher ? styles.switchTeacherOn : styles.switchTeacherOff)}
                            onClick={() => toggleTeacher()}
                        >
                            <i className="fas fa-graduation-cap"></i>
                        </div>
                    </div>
                    {/*------------- DATA -------------------*/}
                    <div className={css(styles.data)}>
                        <h1 style={{ textAlign: 'center' }}>Data</h1>
                        <table>
                            <tbody>
                                <tr />
                                <tr>
                                    <td>Total Games: </td>
                                    <td>{data.stats.totalGames}</td>
                                </tr>
                                <tr>
                                    <td>Average Rating: </td>
                                    <td>{data.stats.averageRating}</td>
                                </tr>
                                <tr>
                                    <td>White Win Percentage: </td>
                                    <td>{data.stats.whiteWinPercentage}%</td>
                                </tr>
                                <tr>
                                    <td>Black Win Percentage: </td>
                                    <td>{data.stats.blackWinPercentage}%</td>
                                </tr>
                                <tr>
                                    <td>Draw Percentage: </td>
                                    <td>{data.stats.drawPercentage}%</td>
                                </tr>
                            </tbody>
                        </table>
                        <p style={{ fontSize: '1.25rem' }}>{toMove.slice(0, 1).toUpperCase() + toMove.slice(1)} to play:</p>
                        <div className={css(styles.moves)}>
                            <table className={css(styles.moveTable)}>
                                <tbody>
                                    {data[toMove].map(move => {
                                        const totalGames = move.white + move.black + move.draws
                                        const whiteWinPercentage = ((move.white / totalGames) * 100).toFixed(0)
                                        const blackWinPercentage = ((move.black / totalGames) * 100).toFixed(0)
                                        const drawPercentage = ((move.draws / totalGames) * 100).toFixed(0)

                                        return (
                                            <tr key={move.uci}>
                                                <td>{move.uci.slice(0, 2)}  =>  {move.uci.slice(2)}</td>
                                                <td><b>W : </b>{whiteWinPercentage}%</td>
                                                <td><b>B : </b>{blackWinPercentage}%</td>
                                                <td><b>D : </b>{drawPercentage}%</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/*-------- HISTORY ------------*/}
                        <div className={css(styles.config)}>
                            <div className={css(styles.navigator)} onClick={() => onUndo()}><i className="fas fa-step-backward"></i></div>
                            <div className={css(styles.resetBtn)} onClick={() => reset()}>Reset</div>
                            <div className={css(styles.navigator)} onClick={() => onRedo()}><i className="fas fa-step-forward"></i></div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data.present,
        toMove: state.board.present.toMove,
        canUndo: state.data.past.length > 0,
        canRedo: state.data.future.length > 0,
    }
}
const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        togglePanel,
        toggleAuto,
        toggleAutoHover,
        togglePlayer,
        toggleTeacher,
        reset,
        undo: UndoActionCreators.undo,
        redo: UndoActionCreators.redo
    }, dispatch)
}
const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    return { ...propsFromState, ...propsFromDispatch, ...ownProps }
}

export default connect(mapStateToProps, mapActionsToProps, mergeProps)(DataPanel)