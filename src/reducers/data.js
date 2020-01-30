import {
    UPDATE_DATA,
    TOGGLE_PANEL,
    TOGGLE_AUTO_HOVER,
    TOGGLE_PLAYER
} from '../actions/updateData'
import { initialMoves } from '../data/initialMoves'

const initialState = {
    player: 'white',
    stats: {
        totalGames: '- - -',
        averageRating: '- - -',
        whiteWinPercentage: 34,
        blackWinPercentage: 24,
        drawPercentage: 42,
    },
    white: initialMoves,
    black: [],
    panel: {
        open: true,
        auto: true,
        autoHover: false,
        teacher: false
    }
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
        // -------------------------------------------------------------------------------
        case TOGGLE_PANEL:
            return {
                ...state,
                panel: Object.assign({}, state.panel, {
                    open: state.panel.open ? false : true
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
        default:
            return state
    }
}

export default reducer