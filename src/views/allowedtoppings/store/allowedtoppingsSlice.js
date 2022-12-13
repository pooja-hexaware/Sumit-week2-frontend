import { createSlice } from '@reduxjs/toolkit'
import { fetchAllowedtoppings } from './allowedtoppings.action'
import { addAllowedtoppings } from './allowedtoppings.action'
import { editAllowedtoppings } from './allowedtoppings.action'
import { deleteAllowedtoppings } from './allowedtoppings.action'

const fetchAllowedtoppingsExtraReducer = {
    [fetchAllowedtoppings.pending]: (state, action) => {
        state.loading = true
    },
    [fetchAllowedtoppings.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchAllowedtoppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const addAllowedtoppingsExtraReducer = {
    [addAllowedtoppings.pending]: (state, action) => {
        state.loading = true
    },
    [addAllowedtoppings.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addAllowedtoppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const editAllowedtoppingsExtraReducer = {
    [editAllowedtoppings.pending]: (state, action) => {
        state.loading = true
    },
    [editAllowedtoppings.fulfilled]: (state, action) => {
        const { id, name, price } = action.payload
        const existingAllowedtoppings = state.entities.find(
            (allowedtoppings) => allowedtoppings.id.toString() === id.toString()
        )
        if (existingAllowedtoppings) {
            existingAllowedtoppings.name = name
            existingAllowedtoppings.price = price
        }
        state.loading = false
    },
    [editAllowedtoppings.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteAllowedtoppingsExtraReducer = {
    [deleteAllowedtoppings.pending]: (state, action) => {
        state.loading = true
    },
    [deleteAllowedtoppings.fulfilled]: (state, action) => {
        const id = action.payload
        const existingAllowedtoppings = state.entities.find(
            (allowedtoppings) => allowedtoppings.id.toString() === id.toString()
        )
        if (existingAllowedtoppings) {
            state.entities = state.entities.filter(
                (allowedtoppings) => allowedtoppings.id !== id
            )
        }
        state.loading = false
    },
    [deleteAllowedtoppings.rejected]: (state, action) => {
        state.loading = false
    },
}
const allowedtoppingsSlice = createSlice({
    name: 'allowedtoppings',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        allowedtoppingsAdded(state, action) {
            state.entities.push(action.payload)
        },
        allowedtoppingsUpdated(state, action) {
            const { id, name, price } = action.payload
            const existingAllowedtoppings = state.entities.find(
                (allowedtoppings) =>
                    allowedtoppings.id.toString() === id.toString()
            )
            if (existingAllowedtoppings) {
                existingAllowedtoppings.name = name
                existingAllowedtoppings.price = price
            }
        },
        allowedtoppingsDeleted(state, action) {
            const { id } = action.payload
            const existingAllowedtoppings = state.entities.find(
                (allowedtoppings) =>
                    allowedtoppings.id.toString() === id.toString()
            )
            if (existingAllowedtoppings) {
                state.entities = state.entities.filter(
                    (allowedtoppings) => allowedtoppings.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchAllowedtoppingsExtraReducer,
        ...addAllowedtoppingsExtraReducer,
        ...editAllowedtoppingsExtraReducer,
        ...deleteAllowedtoppingsExtraReducer,
    },
})

export const {
    allowedtoppingsAdded,
    allowedtoppingsUpdated,
    allowedtoppingsDeleted,
} = allowedtoppingsSlice.actions

export default allowedtoppingsSlice.reducer
