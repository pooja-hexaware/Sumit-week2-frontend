import { createSlice } from '@reduxjs/toolkit'
import { fetchStoremenu } from './storemenu.action'
import { addStoremenu } from './storemenu.action'
import { editStoremenu } from './storemenu.action'
import { deleteStoremenu } from './storemenu.action'

const fetchStoremenuExtraReducer = {
    [fetchStoremenu.pending]: (state, action) => {
        state.loading = true
    },
    [fetchStoremenu.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchStoremenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const addStoremenuExtraReducer = {
    [addStoremenu.pending]: (state, action) => {
        state.loading = true
    },
    [addStoremenu.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addStoremenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const editStoremenuExtraReducer = {
    [editStoremenu.pending]: (state, action) => {
        state.loading = true
    },
    [editStoremenu.fulfilled]: (state, action) => {
        const { id, storeId } = action.payload
        const existingStoremenu = state.entities.find(
            (storemenu) => storemenu.id.toString() === id.toString()
        )
        if (existingStoremenu) {
            existingStoremenu.storeId = storeId
        }
        state.loading = false
    },
    [editStoremenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteStoremenuExtraReducer = {
    [deleteStoremenu.pending]: (state, action) => {
        state.loading = true
    },
    [deleteStoremenu.fulfilled]: (state, action) => {
        const id = action.payload
        const existingStoremenu = state.entities.find(
            (storemenu) => storemenu.id.toString() === id.toString()
        )
        if (existingStoremenu) {
            state.entities = state.entities.filter(
                (storemenu) => storemenu.id !== id
            )
        }
        state.loading = false
    },
    [deleteStoremenu.rejected]: (state, action) => {
        state.loading = false
    },
}
const storemenuSlice = createSlice({
    name: 'storemenu',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        storemenuAdded(state, action) {
            state.entities.push(action.payload)
        },
        storemenuUpdated(state, action) {
            const { id, storeId } = action.payload
            const existingStoremenu = state.entities.find(
                (storemenu) => storemenu.id.toString() === id.toString()
            )
            if (existingStoremenu) {
                existingStoremenu.storeId = storeId
            }
        },
        storemenuDeleted(state, action) {
            const { id } = action.payload
            const existingStoremenu = state.entities.find(
                (storemenu) => storemenu.id.toString() === id.toString()
            )
            if (existingStoremenu) {
                state.entities = state.entities.filter(
                    (storemenu) => storemenu.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchStoremenuExtraReducer,
        ...addStoremenuExtraReducer,
        ...editStoremenuExtraReducer,
        ...deleteStoremenuExtraReducer,
    },
})

export const { storemenuAdded, storemenuUpdated, storemenuDeleted } =
    storemenuSlice.actions

export default storemenuSlice.reducer
