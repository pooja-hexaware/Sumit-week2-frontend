import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchCustomer,
    addCustomer,
    editCustomer,
    deleteCustomer,
} from '../customer.action'

const getCustomerListResponse = [
    {
        id: 1,
        name: 'name',
        postalcode: 'postalcode',
        city: 'city',
    },
]

const addCustomerListResponse = (data) => {
    return { id: 2, ...data }
}
const editCustomerListResponse = (data) => {
    return data
}

describe('should test Customer redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'customer'
    test('Should be able to fetch the customer list and update customer redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getCustomerListResponse)
        const result = await store.dispatch(fetchCustomer())
        const customerList = result.payload
        expect(result.type).toBe('customer/fetchCustomer/fulfilled')
        expect(customerList).toEqual(getCustomerListResponse)

        const state = store.getState().customer
        expect(state.entities).toEqual(customerList)
    })

    test('Should be able to add new customer to list and make post api and update customer redux store', async () => {
        const body = {
            name: 'name',
            postalcode: 'postalcode',
            city: 'city',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addCustomerListResponse(body)
        )
        const result = await store.dispatch(addCustomer(body))
        const customerItem = result.payload
        expect(result.type).toBe('customer/addCustomer/fulfilled')
        expect(customerItem).toEqual(addCustomerListResponse(body))

        const state = store.getState().customer
        expect(state.entities).toContainEqual(addCustomerListResponse(body))
    })

    test('Should be able to edit customer in list and make put api call and update customer redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            postalcode: 'postalcode',
            city: 'city',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editCustomerListResponse(body)
        )
        const result = await store.dispatch(editCustomer(body))
        const customerItem = result.payload
        expect(result.type).toBe('customer/editCustomer/fulfilled')
        expect(customerItem).toEqual(editCustomerListResponse(body))

        const state = store.getState().customer
        let changedCustomer = state.entities.find((p) => p.id === body.id)
        expect(changedCustomer.name).toEqual(body.name)
    })

    test('Should be able to delete customer in list and update customer redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().customer
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteCustomer(input))
        const deletId = result.payload
        expect(result.type).toBe('customer/deleteCustomer/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().customer
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
