import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'allowedtoppings'

export const fetchAllowedtoppings = createAsyncThunk(
    'allowedtoppings/fetchAllowedtoppings',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const allowedtoppings = await response.data
        return allowedtoppings
    }
)

export const addAllowedtoppings = createAsyncThunk(
    'allowedtoppings/addAllowedtoppings',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const allowedtoppings = await response.data
        thunkAPI.dispatch(showSuccess('Allowedtoppings added successfully'))
        return allowedtoppings
    }
)

export const editAllowedtoppings = createAsyncThunk(
    'allowedtoppings/editAllowedtoppings',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const allowedtoppings = await response.data
        thunkAPI.dispatch(showSuccess('Allowedtoppings updated successfully'))
        return allowedtoppings
    }
)

export const deleteAllowedtoppings = createAsyncThunk(
    'allowedtoppings/deleteAllowedtoppings',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected allowedtoppings deleted successfully.')
            )
            return data.id
        }
    }
)
