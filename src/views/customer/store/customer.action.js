import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'customer'

export const fetchCustomer = createAsyncThunk(
    'customer/fetchCustomer',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const customer = await response.data
        return customer
    }
)

export const addCustomer = createAsyncThunk(
    'customer/addCustomer',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const customer = await response.data
        thunkAPI.dispatch(showSuccess('Customer added successfully'))
        return customer
    }
)

export const editCustomer = createAsyncThunk(
    'customer/editCustomer',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const customer = await response.data
        thunkAPI.dispatch(showSuccess('Customer updated successfully'))
        return customer
    }
)

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected customer deleted successfully.')
            )
            return data.id
        }
    }
)
