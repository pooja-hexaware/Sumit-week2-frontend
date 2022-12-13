import { createSlice } from '@reduxjs/toolkit'
import { fetchCustomer } from './customer.action'
import { addCustomer } from './customer.action'
import { editCustomer } from './customer.action'
import { deleteCustomer } from './customer.action'

const fetchCustomerExtraReducer = {
    [fetchCustomer.pending]: (state, action) => {
        state.loading = true
    },
    [fetchCustomer.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchCustomer.rejected]: (state, action) => {
        state.loading = false
    },
}

const addCustomerExtraReducer = {
    [addCustomer.pending]: (state, action) => {
        state.loading = true
    },
    [addCustomer.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addCustomer.rejected]: (state, action) => {
        state.loading = false
    },
}

const editCustomerExtraReducer = {
    [editCustomer.pending]: (state, action) => {
        state.loading = true
    },
    [editCustomer.fulfilled]: (state, action) => {
        const { id, name, postalcode, city } = action.payload
        const existingCustomer = state.entities.find(
            (customer) => customer.id.toString() === id.toString()
        )
        if (existingCustomer) {
            existingCustomer.name = name
            existingCustomer.postalcode = postalcode
            existingCustomer.city = city
        }
        state.loading = false
    },
    [editCustomer.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteCustomerExtraReducer = {
    [deleteCustomer.pending]: (state, action) => {
        state.loading = true
    },
    [deleteCustomer.fulfilled]: (state, action) => {
        const id = action.payload
        const existingCustomer = state.entities.find(
            (customer) => customer.id.toString() === id.toString()
        )
        if (existingCustomer) {
            state.entities = state.entities.filter(
                (customer) => customer.id !== id
            )
        }
        state.loading = false
    },
    [deleteCustomer.rejected]: (state, action) => {
        state.loading = false
    },
}
const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        customerAdded(state, action) {
            state.entities.push(action.payload)
        },
        customerUpdated(state, action) {
            const { id, name, postalcode, city } = action.payload
            const existingCustomer = state.entities.find(
                (customer) => customer.id.toString() === id.toString()
            )
            if (existingCustomer) {
                existingCustomer.name = name
                existingCustomer.postalcode = postalcode
                existingCustomer.city = city
            }
        },
        customerDeleted(state, action) {
            const { id } = action.payload
            const existingCustomer = state.entities.find(
                (customer) => customer.id.toString() === id.toString()
            )
            if (existingCustomer) {
                state.entities = state.entities.filter(
                    (customer) => customer.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchCustomerExtraReducer,
        ...addCustomerExtraReducer,
        ...editCustomerExtraReducer,
        ...deleteCustomerExtraReducer,
    },
})

export const { customerAdded, customerUpdated, customerDeleted } =
    customerSlice.actions

export default customerSlice.reducer
