import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchStore, addStore, editStore, deleteStore } from '../store.action'

const getStoreListResponse = [
    {
        id: 1,
        name: 'name',
        address: 'address',
        zip: 'zip',
        city: 'city',
        stateName: 'stateName',
        storePhone: 'storePhone',
        kitchenPhone: 'kitchenPhone',
        isActive: true,
    },
]

const addStoreListResponse = (data) => {
    return { id: 2, ...data }
}
const editStoreListResponse = (data) => {
    return data
}

describe('should test Store redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'store'
    test('Should be able to fetch the store list and update store redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getStoreListResponse)
        const result = await store.dispatch(fetchStore())
        const storeList = result.payload
        expect(result.type).toBe('store/fetchStore/fulfilled')
        expect(storeList).toEqual(getStoreListResponse)

        const state = store.getState().store
        expect(state.entities).toEqual(storeList)
    })

    test('Should be able to add new store to list and make post api and update store redux store', async () => {
        const body = {
            name: 'name',
            address: 'address',
            zip: 'zip',
            city: 'city',
            stateName: 'stateName',
            storePhone: 'storePhone',
            kitchenPhone: 'kitchenPhone',
            isActive: true,
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addStoreListResponse(body))
        const result = await store.dispatch(addStore(body))
        const storeItem = result.payload
        expect(result.type).toBe('store/addStore/fulfilled')
        expect(storeItem).toEqual(addStoreListResponse(body))

        const state = store.getState().store
        expect(state.entities).toContainEqual(addStoreListResponse(body))
    })

    test('Should be able to edit store in list and make put api call and update store redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            address: 'address',
            zip: 'zip',
            city: 'city',
            stateName: 'stateName',
            storePhone: 'storePhone',
            kitchenPhone: 'kitchenPhone',
            isActive: false,
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editStoreListResponse(body)
        )
        const result = await store.dispatch(editStore(body))
        const storeItem = result.payload
        expect(result.type).toBe('store/editStore/fulfilled')
        expect(storeItem).toEqual(editStoreListResponse(body))

        const state = store.getState().store
        let changedStore = state.entities.find((p) => p.id === body.id)
        expect(changedStore.name).toEqual(body.name)
    })

    test('Should be able to delete store in list and update store redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().store
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteStore(input))
        const deletId = result.payload
        expect(result.type).toBe('store/deleteStore/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().store
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
