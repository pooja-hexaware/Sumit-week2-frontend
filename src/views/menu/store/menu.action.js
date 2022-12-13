import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'menu'

export const fetchMenu = createAsyncThunk('menu/fetchMenu', async () => {
    const response = await axios.get(`/${endPoint}`)
    const menu = await response.data
    return menu
})

export const addMenu = createAsyncThunk(
    'menu/addMenu',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const menu = await response.data
        thunkAPI.dispatch(showSuccess('Menu added successfully'))
        return menu
    }
)

export const editMenu = createAsyncThunk(
    'menu/editMenu',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const menu = await response.data
        thunkAPI.dispatch(showSuccess('Menu updated successfully'))
        return menu
    }
)

export const deleteMenu = createAsyncThunk(
    'menu/deleteMenu',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected menu deleted successfully.')
            )
            return data.id
        }
    }
)
