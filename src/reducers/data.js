import {
    UPDATE_DATA,
} from '../actions/updateData'
import { initialMoves } from '../data/initialMoves'

const initialState = {
    player: 'white',
    stats: {
        whiteWinPercentage: 34,
        blackWinPercentage: 24,
        drawWinPercentage: 42,
    },
    white: initialMoves,
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
            if (totalGames > 0) {
                return {
                    ...state,
                    stats: {
                        whiteWinPercentage,
                        blackWinPercentage,
                        drawPercentage
                    },
                    [toMove]: data.moves
                }
            } else {
                return {
                    ...state,
                    noGames: true
                }
            }
        // -------------------------------------------------------------------------------
        default:
            return state
    }
}

export default reducer