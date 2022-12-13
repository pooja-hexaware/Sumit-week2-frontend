import { createSlice } from '@reduxjs/toolkit';
import { fetchStore, addStore, editStore, deleteStore, getMenuByStore, findStore } from './store.action';

const fetchStoreExtraReducer = {
	[fetchStore.pending]: (state, action) => {
		state.loading = true;
	},
	[fetchStore.fulfilled]: (state, action) => {
		state.entities = [...action.payload];
		state.loading = false;
	},
	[fetchStore.rejected]: (state, action) => {
		state.loading = false;
	},
}

const getMenuByStoreExtraReducer = {
	[getMenuByStore.pending]: (state, action) => {
		state.loading = true;
	},
	[getMenuByStore.fulfilled]: (state, action) => {
		state.entities = [...action.payload];
		state.loading = false;
	},
	[getMenuByStore.rejected]: (state, action) => {
		state.loading = false;
	},
}

const findStoreExtraReducer = {
	[findStore.pending]: (state, action) => {
		state.loading = true;
	},
	[findStore.fulfilled]: (state, action) => {
		state.entities = [...action.payload];
		state.loading = false;
	},
	[findStore.rejected]: (state, action) => {
		state.loading = false;
	},
}

const addStoreExtraReducer = {
	[addStore.pending]: (state, action) => {
		state.loading = true;
	},
	[addStore.fulfilled]: (state, action) => {
		state.entities.push(action.payload);
		state.loading = false;
	},
	[addStore.rejected]: (state, action) => {
		state.loading = false;
	},
}

const editStoreExtraReducer = {
	[editStore.pending]: (state, action) => {
		state.loading = true;
	},
	[editStore.fulfilled]: (state, action) => {
		const {
			id,
			name,
			address,
			zip,
			city,
			stateName,
			storePhone,
			kitchenPhone,
			isActive,
		} = action.payload;
		const existingStore = state.entities.find(
			(store) => store.id.toString() === id.toString()
		);
		if (existingStore) {
			existingStore.name = name;
			existingStore.address = address;
			existingStore.zip = zip;
			existingStore.city = city;
			existingStore.stateName = stateName;
			existingStore.storePhone = storePhone;
			existingStore.kitchenPhone = kitchenPhone;
			existingStore.isActive = isActive;
		}
		state.loading = false;
	},
	[editStore.rejected]: (state, action) => {
		state.loading = false;
	},
}

const deleteStoreExtraReducer = {
	[deleteStore.pending]: (state, action) => {
		state.loading = true;
	},
	[deleteStore.fulfilled]: (state, action) => {
		const id = action.payload;
		const existingStore = state.entities.find(
			(store) => store.id.toString() === id.toString()
		);
		if (existingStore) {
			state.entities = state.entities.filter((store) => store.id !== id);
		}
		state.loading = false;
	},
	[deleteStore.rejected]: (state, action) => {
		state.loading = false;
	},
}
const storeSlice = createSlice({
	name: 'store',
	initialState: {
		entities: [],
		cartData: [],
		currentMenuData: {},
		toppingPrice: 0,
		menuPrice: 0,
		totalPrice: 0,
		loading: false,
	},
	reducers: {
		setToppingPrice: (s, a) => {
			s.toppingPrice = a.payload;
		},
		setMenuPrice: (s, a) => {
			s.menuPrice = a.payload;
		},
		setTotalPrice: (s, a) => {
			s.totalPrice = a.payload;
		},
		setCurrentMenuData: (s, a) => {
			console.log('Current menudata in slice: ' + a.payload);
			s.currentMenuData = a.payload;
		},
		setCartData: (state, action) => {
			state.cartData = action.payload;
		},
		storeAdded(state, action) {
			state.entities.push(action.payload);;
		},
		setEntities(state, action) {
			state.entities = action.payload;
		},
		storeUpdated(state, action) {
			const {
				id,
				name,
				address,
				zip,
				city,
				stateName,
				storePhone,
				kitchenPhone,
				isActive,
			} = action.payload;
			const existingStore = state.entities.find(
				(store) => store.id.toString() === id.toString()
			);
			if (existingStore) {
				existingStore.name = name;
				existingStore.address = address;
				existingStore.zip = zip;
				existingStore.city = city;
				existingStore.stateName = stateName;
				existingStore.storePhone = storePhone;
				existingStore.kitchenPhone = kitchenPhone;
				existingStore.isActive = isActive;
			}
		},
		storeDeleted(state, action) {
			const { id } = action.payload;
			const existingStore = state.entities.find(
				(store) => store.id.toString() === id.toString()
			);
			if (existingStore) {
				state.entities = state.entities.filter(
					(store) => store.id !== id
				);
			}
		},
	},
	extraReducers: {
		...fetchStoreExtraReducer,
		...addStoreExtraReducer,
		...editStoreExtraReducer,
		...deleteStoreExtraReducer,
		...getMenuByStoreExtraReducer,
		...findStoreExtraReducer
	},
})

export const { setToppingPrice, storeAdded, storeUpdated, storeDeleted, setCartData, setEntities, setMenuPrice, setTotalPrice, setCurrentMenuData } = storeSlice.actions;

export default storeSlice.reducer;
