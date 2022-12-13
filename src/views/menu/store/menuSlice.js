import { createSlice } from '@reduxjs/toolkit'
import { fetchMenu } from './menu.action'
import { addMenu } from './menu.action'
import { editMenu } from './menu.action'
import { deleteMenu } from './menu.action'

const fetchMenuExtraReducer = {
    [fetchMenu.pending]: (state, action) => {
        state.loading = true
    },
    [fetchMenu.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchMenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const addMenuExtraReducer = {
    [addMenu.pending]: (state, action) => {
        state.loading = true
    },
    [addMenu.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addMenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const editMenuExtraReducer = {
    [editMenu.pending]: (state, action) => {
        state.loading = true
    },
    [editMenu.fulfilled]: (state, action) => {
        const { id, name, description, amount, quantity } = action.payload
        const existingMenu = state.entities.find(
            (menu) => menu.id.toString() === id.toString()
        )
        if (existingMenu) {
            existingMenu.name = name
            existingMenu.description = description
            existingMenu.amount = amount
            existingMenu.quantity = quantity
        }
        state.loading = false
    },
    [editMenu.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteMenuExtraReducer = {
    [deleteMenu.pending]: (state, action) => {
        state.loading = true
    },
    [deleteMenu.fulfilled]: (state, action) => {
        const id = action.payload
        const existingMenu = state.entities.find(
            (menu) => menu.id.toString() === id.toString()
        )
        if (existingMenu) {
            state.entities = state.entities.filter((menu) => menu.id !== id)
        }
        state.loading = false
    },
    [deleteMenu.rejected]: (state, action) => {
        state.loading = false
    },
}
const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        menuAdded(state, action) {
            state.entities.push(action.payload)
        },
        menuUpdated(state, action) {
            const { id, name, description, amount, quantity } = action.payload
            const existingMenu = state.entities.find(
                (menu) => menu.id.toString() === id.toString()
            )
            if (existingMenu) {
                existingMenu.name = name
                existingMenu.description = description
                existingMenu.amount = amount
                existingMenu.quantity = quantity
            }
        },
        menuDeleted(state, action) {
            const { id } = action.payload
            const existingMenu = state.entities.find(
                (menu) => menu.id.toString() === id.toString()
            )
            if (existingMenu) {
                state.entities = state.entities.filter((menu) => menu.id !== id)
            }
        },
    },
    extraReducers: {
        ...fetchMenuExtraReducer,
        ...addMenuExtraReducer,
        ...editMenuExtraReducer,
        ...deleteMenuExtraReducer,
    },
})

export const { menuAdded, menuUpdated, menuDeleted } = menuSlice.actions

export default menuSlice.reducer
