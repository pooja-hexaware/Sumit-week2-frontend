import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchStoremenu,
    addStoremenu,
    editStoremenu,
    deleteStoremenu,
} from '../storemenu.action'

const getStoremenuListResponse = [
    {
        id: 1,
        storeId: 'storeId',
    },
]

const addStoremenuListResponse = (data) => {
    return { id: 2, ...data }
}
const editStoremenuListResponse = (data) => {
    return data
}

describe('should test Storemenu redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'storemenu'
    test('Should be able to fetch the storemenu list and update storemenu redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getStoremenuListResponse)
        const result = await store.dispatch(fetchStoremenu())
        const storemenuList = result.payload
        expect(result.type).toBe('storemenu/fetchStoremenu/fulfilled')
        expect(storemenuList).toEqual(getStoremenuListResponse)

        const state = store.getState().storemenu
        expect(state.entities).toEqual(storemenuList)
    })

    test('Should be able to add new storemenu to list and make post api and update storemenu redux store', async () => {
        const body = {
            storeId: 'storeId',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addStoremenuListResponse(body)
        )
        const result = await store.dispatch(addStoremenu(body))
        const storemenuItem = result.payload
        expect(result.type).toBe('storemenu/addStoremenu/fulfilled')
        expect(storemenuItem).toEqual(addStoremenuListResponse(body))

        const state = store.getState().storemenu
        expect(state.entities).toContainEqual(addStoremenuListResponse(body))
    })

    test('Should be able to edit storemenu in list and make put api call and update storemenu redux store', async () => {
        const body = {
            id: 1,
            storeId: 'storeId',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editStoremenuListResponse(body)
        )
        const result = await store.dispatch(editStoremenu(body))
        const storemenuItem = result.payload
        expect(result.type).toBe('storemenu/editStoremenu/fulfilled')
        expect(storemenuItem).toEqual(editStoremenuListResponse(body))

        const state = store.getState().storemenu
        let changedStoremenu = state.entities.find((p) => p.id === body.id)
        expect(changedStoremenu.name).toEqual(body.name)
    })

    test('Should be able to delete storemenu in list and update storemenu redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().storemenu
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteStoremenu(input))
        const deletId = result.payload
        expect(result.type).toBe('storemenu/deleteStoremenu/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().storemenu
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
