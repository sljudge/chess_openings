import {
    UPDATE_DATA,
    TOGGLE_PANEL,
    TOGGLE_AUTO,
    TOGGLE_AUTO_HOVER,
    TOGGLE_PLAYER,
    RESET,
    SET_ALERT
} from '../actions/updateData'
import { initialMoves } from '../data/initialMoves'

const initialState = {
    player: 'white',
    stats: {
        totalGames: 2121662,
        averageRating: 2408,
        whiteWinPercentage: 34,
        blackWinPercentage: 24,
        drawPercentage: 42,
    },
    white: initialMoves,
    black: [],
    panel: {
        open: true,
        auto: false,
        autoHover: false,
        teacher: false
    },
    alert: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_DATA:
            const data = action.result
            const toMove = action.toMove
            const totalGames = data.white + data.draws + data.black
            const whiteWinPercentage = ((data.white / totalGames) * 100).toFixed(0)
            const blackWinPercentage = ((data.black / totalGames) * 100).toFixed(0)
            const drawPercentage = ((data.draws / totalGames) * 100).toFixed(0)
            const averageRating = data.averageRating
            const topGames = data.topGames

            if (totalGames > 0) {
                return {
                    ...state,
                    stats: {
                        totalGames,
                        averageRating,
                        whiteWinPercentage,
                        blackWinPercentage,
                        drawPercentage
                    },
                    [toMove]: data.moves,
                    topGames
                }
            } else {
                return {
                    ...state,
                    stats: {
                        totalGames,
                        averageRating,
                        whiteWinPercentage,
                        blackWinPercentage,
                        drawPercentage
                    },
                    noGames: true
                }
            }
        // -------------------------------------------------------------------------------
        case TOGGLE_PLAYER:
            return {
                ...state,
                player: state.player === 'white' ? 'black' : 'white'
            }
        // -------------------------------------------------------------------------------
        case TOGGLE_PANEL:
            return {
                ...state,
                panel: Object.assign({}, state.panel, {
                    open: state.panel.open ? false : true
                })
            }
        // -------------------------------------------------------------------------------
        case TOGGLE_AUTO:
            return {
                ...state,
                panel: Object.assign({}, state.panel, {
                    auto: state.panel.auto ? false : true
                })
            }
        // -------------------------------------------------------------------------------
        case TOGGLE_AUTO_HOVER:
            return {
                ...state,
                panel: Object.assign({}, state.panel, {
                    autoHover: state.panel.autoHover ? false : true
                })
            }
        // -------------------------------------------------------------------------------
        case RESET:
            const newState = Object.assign({}, initialState, {
                player: state.player
            })
            return {
                ...state,
                ...newState

            }
        // -------------------------------------------------------------------------------
        case SET_ALERT:
            return {
                ...state,
                alert: true
            }
        // -------------------------------------------------------------------------------
        default:
            return state
    }
}

export default reducer