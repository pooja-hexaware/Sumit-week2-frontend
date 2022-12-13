import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'order'

export const fetchOrder = createAsyncThunk('order/fetchOrder', async () => {
    const response = await axios.get(`/${endPoint}`)
    const order = await response.data
    return order
})

export const addOrder = createAsyncThunk(
    'order/addOrder',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const order = await response.data
        thunkAPI.dispatch(showSuccess('Order added successfully'))
        return order
    }
)

export const editOrder = createAsyncThunk(
    'order/editOrder',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const order = await response.data
        thunkAPI.dispatch(showSuccess('Order updated successfully'))
        return order
    }
)

export const deleteOrder = createAsyncThunk(
    'order/deleteOrder',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected order deleted successfully.')
            )
            return data.id
        }
    }
)
