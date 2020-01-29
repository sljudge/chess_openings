export const UPDATE_DATA = 'UPDATE_DATA'

export const updateData = (data) => {
    return ({
        type: UPDATE_DATA,
        data
    })
}