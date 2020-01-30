export const UPDATE_DATA = 'UPDATE_DATA'
export const TOGGLE_PLAYER = 'TOGGLE_PLAYER'
export const TOGGLE_PANEL = 'TOGGLE_PANEL'
export const TOGGLE_AUTO_HOVER = 'TOGGLE_AUTO_HOVER'

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

export const toggleAutoHover = () => {
    return ({
        type: TOGGLE_AUTO_HOVER
    })
}