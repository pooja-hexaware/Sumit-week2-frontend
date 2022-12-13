import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'facilities'

export const fetchFacilities = createAsyncThunk(
    'facilities/fetchFacilities',
    async () => {
        const response = await axios.get(`/${endPoint}`)
        const facilities = await response.data
        return facilities
    }
)

export const addFacilities = createAsyncThunk(
    'facilities/addFacilities',
    async (data, thunkAPI) => {
        const response = await axios.post(`/${endPoint}`, data)
        const facilities = await response.data
        thunkAPI.dispatch(showSuccess('Facilities added successfully'))
        return facilities
    }
)

export const editFacilities = createAsyncThunk(
    'facilities/editFacilities',
    async (data, thunkAPI) => {
        const response = await axios.put(`/${endPoint}/${data.id}`, data)
        const facilities = await response.data
        thunkAPI.dispatch(showSuccess('Facilities updated successfully'))
        return facilities
    }
)

export const deleteFacilities = createAsyncThunk(
    'facilities/deleteFacilities',
    async (data, thunkAPI) => {
        const response = await axios.delete(`/${endPoint}/${data.id}`)
        const status = await response.status
        if (status === 200) {
            thunkAPI.dispatch(
                showSuccess('Selected facilities deleted successfully.')
            )
            return data.id
        }
    }
)
