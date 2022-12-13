import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import { fetchMenu, addMenu, editMenu, deleteMenu } from '../menu.action'

const getMenuListResponse = [
    {
        id: 1,
        name: 'name',
        description: 'description',
        amount: 'amount',
        quantity: 'quantity',
    },
]

const addMenuListResponse = (data) => {
    return { id: 2, ...data }
}
const editMenuListResponse = (data) => {
    return data
}

describe('should test Menu redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'menu'
    test('Should be able to fetch the menu list and update menu redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getMenuListResponse)
        const result = await store.dispatch(fetchMenu())
        const menuList = result.payload
        expect(result.type).toBe('menu/fetchMenu/fulfilled')
        expect(menuList).toEqual(getMenuListResponse)

        const state = store.getState().menu
        expect(state.entities).toEqual(menuList)
    })

    test('Should be able to add new menu to list and make post api and update menu redux store', async () => {
        const body = {
            name: 'name',
            description: 'description',
            amount: 'amount',
            quantity: 'quantity',
        }
        mock.onPost(`/${endPoint}`, body).reply(201, addMenuListResponse(body))
        const result = await store.dispatch(addMenu(body))
        const menuItem = result.payload
        expect(result.type).toBe('menu/addMenu/fulfilled')
        expect(menuItem).toEqual(addMenuListResponse(body))

        const state = store.getState().menu
        expect(state.entities).toContainEqual(addMenuListResponse(body))
    })

    test('Should be able to edit menu in list and make put api call and update menu redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            description: 'description',
            amount: 'amount',
            quantity: 'quantity',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editMenuListResponse(body)
        )
        const result = await store.dispatch(editMenu(body))
        const menuItem = result.payload
        expect(result.type).toBe('menu/editMenu/fulfilled')
        expect(menuItem).toEqual(editMenuListResponse(body))

        const state = store.getState().menu
        let changedMenu = state.entities.find((p) => p.id === body.id)
        expect(changedMenu.name).toEqual(body.name)
    })

    test('Should be able to delete menu in list and update menu redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().menu
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteMenu(input))
        const deletId = result.payload
        expect(result.type).toBe('menu/deleteMenu/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().menu
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
