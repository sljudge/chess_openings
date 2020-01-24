export const SET_CHECK = 'SET_CHECK'

export const setCheck = (toMove, attack, kingPosition, id) => ({
    type: SET_CHECK,
    toMove,
    attack,
    kingPosition,
    id
})