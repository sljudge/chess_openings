import React from 'react'
import styles from './styles'
import { css } from 'aphrodite'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { togglePanel, toggleAutoHover, togglePlayer } from '../../actions/updateData'


const DataPanel = (props) => {
    const { data, toMove, togglePanel, toggleAutoHover, togglePlayer } = { ...props }
    const panelOpenOrClosed = data.panel.open && styles.panelWrapperOpen

    const setAutoIcon = () => {
        const autoIconOn = (
            <i className="fas fa-play-circle"></i>
        )
        const autoIconOff = (
            <i className="fas fa-stop-circle"></i>
        )
        if (data.panel.auto) {
            return data.panel.autoHover ? autoIconOff : autoIconOn
        } else {
            return data.panel.autoHover ? autoIconOn : autoIconOff
        }
    }


    return (
        <>
            {
                data.panel.open ?
                    <div className={css(styles.btn)} style={{ right: '40rem' }} onClick={() => togglePanel()}><i className="fas fa-chevron-right"></i></div>
                    :
                    <div className={css(styles.btn)} style={{ right: '0' }} onClick={() => togglePanel()}><i className="fas fa-cog"></i></div>
            }
            <div className={css(styles.panelWrapper, panelOpenOrClosed)}>
                <div className={css(styles.panel)}>
                    <div className={css(styles.config)}>
                        <div className={css(styles.switch, data.player === 'white' ? styles.switchWhite : styles.switchBlack)} onClick={togglePlayer}><i className="fas fa-chess-knight"></i></div>
                        <div className={css(styles.switch, data.panel.auto ? styles.switchAutoOn : styles.switchAutoOff)} onMouseEnter={() => toggleAutoHover()} onMouseLeave={() => toggleAutoHover()}>{setAutoIcon()}</div>
                        <div className={css(styles.switch, data.panel.teacher ? styles.switchTeacherOn : styles.switchTeacherOff)}><i className="fas fa-graduation-cap"></i></div>
                    </div>

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
                        <p style={{ fontSize: '1.25rem' }}>{data.player.slice(0, 1).toUpperCase() + data.player.slice(1)} to play:</p>
                        <div className={css(styles.moves)}>
                            <table className={css(styles.moveTable)}>
                                <tbody>
                                    {data[data.player].map(move => {
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
                        <div className={css(styles.config)}>
                            <div className={css(styles.navigator)}><i className="fas fa-step-backward"></i></div>
                            <div className={css(styles.resetBtn)}>Reset</div>
                            <div className={css(styles.navigator)}><i className="fas fa-step-forward"></i></div>
                        </div>
                    </div>
                </div >
            </div>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        data: state.data,
        toMove: state.board.toMove
    }
}
const mapActionsToProps = (dispatch, props) => {
    return bindActionCreators({
        togglePanel,
        toggleAutoHover,
        togglePlayer
    }, dispatch)
}
const mergeProps = (propsFromState, propsFromDispatch, ownProps) => {
    return { ...propsFromState, ...propsFromDispatch, ...ownProps }
}


export default connect(mapStateToProps, mapActionsToProps, mergeProps)(DataPanel)