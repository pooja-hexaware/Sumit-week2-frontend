import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'storemenu'

export const fetchStoremenu = createAsyncThunk(
    'storemenu/fetchStoremenu',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const storemenu = await response.data
        return storemenu
    }
)

export const addStoremenu = createAsyncThunk(
    'storemenu/addStoremenu',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const storemenu = await response.data
        thunkAPI.dispatch(showSuccess('Storemenu added successfully'))
        return storemenu
    }
)

export const editStoremenu = createAsyncThunk(
    'storemenu/editStoremenu',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const storemenu = await response.data
        thunkAPI.dispatch(showSuccess('Storemenu updated successfully'))
        return storemenu
    }
)

export const deleteStoremenu = createAsyncThunk(
    'storemenu/deleteStoremenu',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected storemenu deleted successfully.')
            )
            return data.id
        }
    }
)
