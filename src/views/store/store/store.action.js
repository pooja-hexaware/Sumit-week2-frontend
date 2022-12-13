import { createAsyncThunk } from '@reduxjs/toolkit'
import { showSuccess } from 'middleware/notification/store/notification.actions'
import axios from '../../../axios'

const endPoint = 'store'
const storeMenu = 'storemenu';

export const fetchStore = createAsyncThunk('store/fetchStore', async () => {
	const response = await axios.get(`/${endPoint}`)
	const store = await response.data
	return store
});

export const findStore = createAsyncThunk('store/findStore', async (data) => {
	const response = await axios.get(`/${endPoint}/${data}`);
	const store = await response.data;

	return store;
});

export const getMenuByStore = createAsyncThunk('store/menuList', async (data) => {
	const response = await axios.get(`/${storeMenu}/${data.id}`);
	const store = await response.data;
	if (JSON.stringify(store) !== "{}") return store.menuIds
	else return [];
})

export const addStore = createAsyncThunk(
	'store/addStore',
	async (data, thunkAPI) => {
		const response = await axios.post(`/${endPoint}`, data)
		const store = await response.data
		thunkAPI.dispatch(showSuccess('Store added successfully'))
		return store
	}
)

export const editStore = createAsyncThunk(
	'store/editStore',
	async (data, thunkAPI) => {
		const response = await axios.put(`/${endPoint}/${data.id}`, data)
		const store = await response.data
		thunkAPI.dispatch(showSuccess('Store updated successfully'))
		return store
	}
)

export const deleteStore = createAsyncThunk(
	'store/deleteStore',
	async (data, thunkAPI) => {
		const response = await axios.delete(`/${endPoint}/${data.id}`)
		const status = await response.status
		if (status === 200) {
			thunkAPI.dispatch(
				showSuccess('Selected store deleted successfully.')
			)
			return data.id
		}
	}
)
