import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchAllowedtoppings,
    addAllowedtoppings,
    editAllowedtoppings,
    deleteAllowedtoppings,
} from '../allowedtoppings.action'

const getAllowedtoppingsListResponse = [
    {
        id: 1,
        name: 'name',
        price: 'price',
    },
]

const addAllowedtoppingsListResponse = (data) => {
    return { id: 2, ...data }
}
const editAllowedtoppingsListResponse = (data) => {
    return data
}

describe('should test Allowedtoppings redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'allowedtoppings'
    test('Should be able to fetch the allowedtoppings list and update allowedtoppings redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getAllowedtoppingsListResponse)
        const result = await store.dispatch(fetchAllowedtoppings())
        const allowedtoppingsList = result.payload
        expect(result.type).toBe(
            'allowedtoppings/fetchAllowedtoppings/fulfilled'
        )
        expect(allowedtoppingsList).toEqual(getAllowedtoppingsListResponse)

        const state = store.getState().allowedtoppings
        expect(state.entities).toEqual(allowedtoppingsList)
    })

    test('Should be able to add new allowedtoppings to list and make post api and update allowedtoppings redux store', async () => {
        const body = {
            name: 'name',
            price: 'price',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addAllowedtoppingsListResponse(body)
        )
        const result = await store.dispatch(addAllowedtoppings(body))
        const allowedtoppingsItem = result.payload
        expect(result.type).toBe('allowedtoppings/addAllowedtoppings/fulfilled')
        expect(allowedtoppingsItem).toEqual(
            addAllowedtoppingsListResponse(body)
        )

        const state = store.getState().allowedtoppings
        expect(state.entities).toContainEqual(
            addAllowedtoppingsListResponse(body)
        )
    })

    test('Should be able to edit allowedtoppings in list and make put api call and update allowedtoppings redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            price: 'price',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editAllowedtoppingsListResponse(body)
        )
        const result = await store.dispatch(editAllowedtoppings(body))
        const allowedtoppingsItem = result.payload
        expect(result.type).toBe(
            'allowedtoppings/editAllowedtoppings/fulfilled'
        )
        expect(allowedtoppingsItem).toEqual(
            editAllowedtoppingsListResponse(body)
        )

        const state = store.getState().allowedtoppings
        let changedAllowedtoppings = state.entities.find(
            (p) => p.id === body.id
        )
        expect(changedAllowedtoppings.name).toEqual(body.name)
    })

    test('Should be able to delete allowedtoppings in list and update allowedtoppings redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().allowedtoppings
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteAllowedtoppings(input))
        const deletId = result.payload
        expect(result.type).toBe(
            'allowedtoppings/deleteAllowedtoppings/fulfilled'
        )
        expect(deletId).toEqual(input.id)

        state = store.getState().allowedtoppings
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
