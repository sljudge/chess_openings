export const UPDATE_DATA = 'UPDATE_DATA'
export const TOGGLE_PLAYER = 'TOGGLE_PLAYER'
export const TOGGLE_PANEL = 'TOGGLE_PANEL'
export const TOGGLE_AUTO_HOVER = 'TOGGLE_AUTO_HOVER'
export const RESET = 'RESET'
export const SET_ALERT = 'SET_ALERT'
export const TOGGLE_AUTO = 'TOGGLE_AUTO'
export const CLEAR_GAMES = 'CLEAR_GAMES'
export const TOGGLE_TEACHER = 'TOGGLE_TEACHER'

export const updateData = (data) => {
    return ({
        type: UPDATE_DATA,
        data
    })
}

export const togglePlayer = () => {
    return ({
        type: TOGGLE_PLAYER
    })
}
export const togglePanel = () => {
    return ({
        type: TOGGLE_PANEL
    })
}

export const toggleAuto = () => {
    return ({
        type: TOGGLE_AUTO
    })
}

export const toggleAutoHover = () => {
    return ({
        type: TOGGLE_AUTO_HOVER
    })
}

export const reset = () => {
    return ({
        type: RESET
    })
}

export const setAlert = () => {
    return ({
        type: SET_ALERT
    })
}
export const clearGames = () => {
    return ({
        type: CLEAR_GAMES
    })
}
export const toggleTeacher = () => {
    return {
        type: TOGGLE_TEACHER
    }
}