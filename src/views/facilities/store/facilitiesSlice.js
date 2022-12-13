import { createSlice } from '@reduxjs/toolkit'
import { fetchFacilities } from './facilities.action'
import { addFacilities } from './facilities.action'
import { editFacilities } from './facilities.action'
import { deleteFacilities } from './facilities.action'

const fetchFacilitiesExtraReducer = {
    [fetchFacilities.pending]: (state, action) => {
        state.loading = true
    },
    [fetchFacilities.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchFacilities.rejected]: (state, action) => {
        state.loading = false
    },
}

const addFacilitiesExtraReducer = {
    [addFacilities.pending]: (state, action) => {
        state.loading = true
    },
    [addFacilities.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addFacilities.rejected]: (state, action) => {
        state.loading = false
    },
}

const editFacilitiesExtraReducer = {
    [editFacilities.pending]: (state, action) => {
        state.loading = true
    },
    [editFacilities.fulfilled]: (state, action) => {
        const { id, name, description } = action.payload
        const existingFacilities = state.entities.find(
            (facilities) => facilities.id.toString() === id.toString()
        )
        if (existingFacilities) {
            existingFacilities.name = name
            existingFacilities.description = description
        }
        state.loading = false
    },
    [editFacilities.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteFacilitiesExtraReducer = {
    [deleteFacilities.pending]: (state, action) => {
        state.loading = true
    },
    [deleteFacilities.fulfilled]: (state, action) => {
        const id = action.payload
        const existingFacilities = state.entities.find(
            (facilities) => facilities.id.toString() === id.toString()
        )
        if (existingFacilities) {
            state.entities = state.entities.filter(
                (facilities) => facilities.id !== id
            )
        }
        state.loading = false
    },
    [deleteFacilities.rejected]: (state, action) => {
        state.loading = false
    },
}
const facilitiesSlice = createSlice({
    name: 'facilities',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        facilitiesAdded(state, action) {
            state.entities.push(action.payload)
        },
        facilitiesUpdated(state, action) {
            const { id, name, description } = action.payload
            const existingFacilities = state.entities.find(
                (facilities) => facilities.id.toString() === id.toString()
            )
            if (existingFacilities) {
                existingFacilities.name = name
                existingFacilities.description = description
            }
        },
        facilitiesDeleted(state, action) {
            const { id } = action.payload
            const existingFacilities = state.entities.find(
                (facilities) => facilities.id.toString() === id.toString()
            )
            if (existingFacilities) {
                state.entities = state.entities.filter(
                    (facilities) => facilities.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchFacilitiesExtraReducer,
        ...addFacilitiesExtraReducer,
        ...editFacilitiesExtraReducer,
        ...deleteFacilitiesExtraReducer,
    },
})

export const { facilitiesAdded, facilitiesUpdated, facilitiesDeleted } =
    facilitiesSlice.actions

export default facilitiesSlice.reducer
