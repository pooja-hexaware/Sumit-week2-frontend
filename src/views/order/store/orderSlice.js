import { createSlice } from '@reduxjs/toolkit'
import { fetchOrder } from './order.action'
import { addOrder } from './order.action'
import { editOrder } from './order.action'
import { deleteOrder } from './order.action'

const fetchOrderExtraReducer = {
    [fetchOrder.pending]: (state, action) => {
        state.loading = true
    },
    [fetchOrder.fulfilled]: (state, action) => {
        state.entities = [...action.payload]
        state.loading = false
    },
    [fetchOrder.rejected]: (state, action) => {
        state.loading = false
    },
}

const addOrderExtraReducer = {
    [addOrder.pending]: (state, action) => {
        state.loading = true
    },
    [addOrder.fulfilled]: (state, action) => {
        state.entities.push(action.payload)
        state.loading = false
    },
    [addOrder.rejected]: (state, action) => {
        state.loading = false
    },
}

const editOrderExtraReducer = {
    [editOrder.pending]: (state, action) => {
        state.loading = true
    },
    [editOrder.fulfilled]: (state, action) => {
        const { id, orderDate } = action.payload
        const existingOrder = state.entities.find(
            (order) => order.id.toString() === id.toString()
        )
        if (existingOrder) {
            existingOrder.orderDate = orderDate
        }
        state.loading = false
    },
    [editOrder.rejected]: (state, action) => {
        state.loading = false
    },
}

const deleteOrderExtraReducer = {
    [deleteOrder.pending]: (state, action) => {
        state.loading = true
    },
    [deleteOrder.fulfilled]: (state, action) => {
        const id = action.payload
        const existingOrder = state.entities.find(
            (order) => order.id.toString() === id.toString()
        )
        if (existingOrder) {
            state.entities = state.entities.filter((order) => order.id !== id)
        }
        state.loading = false
    },
    [deleteOrder.rejected]: (state, action) => {
        state.loading = false
    },
}
const orderSlice = createSlice({
    name: 'order',
    initialState: {
        entities: [],
        loading: false,
    },
    reducers: {
        orderAdded(state, action) {
            state.entities.push(action.payload)
        },
        orderUpdated(state, action) {
            const { id, orderDate } = action.payload
            const existingOrder = state.entities.find(
                (order) => order.id.toString() === id.toString()
            )
            if (existingOrder) {
                existingOrder.orderDate = orderDate
            }
        },
        orderDeleted(state, action) {
            const { id } = action.payload
            const existingOrder = state.entities.find(
                (order) => order.id.toString() === id.toString()
            )
            if (existingOrder) {
                state.entities = state.entities.filter(
                    (order) => order.id !== id
                )
            }
        },
    },
    extraReducers: {
        ...fetchOrderExtraReducer,
        ...addOrderExtraReducer,
        ...editOrderExtraReducer,
        ...deleteOrderExtraReducer,
    },
})

export const { orderAdded, orderUpdated, orderDeleted } = orderSlice.actions

export default orderSlice.reducer
