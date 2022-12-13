import axios from '../../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import store from 'store/store'
import {
    fetchFacilities,
    addFacilities,
    editFacilities,
    deleteFacilities,
} from '../facilities.action'

const getFacilitiesListResponse = [
    {
        id: 1,
        name: 'name',
        description: 'description',
    },
]

const addFacilitiesListResponse = (data) => {
    return { id: 2, ...data }
}
const editFacilitiesListResponse = (data) => {
    return data
}

describe('should test Facilities redux tooklit asyncThunk api action and redux store updation', () => {
    const mock = new MockAdapter(axios)
    const endPoint = 'facilities'
    test('Should be able to fetch the facilities list and update facilities redux store', async () => {
        mock.onGet(`/${endPoint}`).reply(200, getFacilitiesListResponse)
        const result = await store.dispatch(fetchFacilities())
        const facilitiesList = result.payload
        expect(result.type).toBe('facilities/fetchFacilities/fulfilled')
        expect(facilitiesList).toEqual(getFacilitiesListResponse)

        const state = store.getState().facilities
        expect(state.entities).toEqual(facilitiesList)
    })

    test('Should be able to add new facilities to list and make post api and update facilities redux store', async () => {
        const body = {
            name: 'name',
            description: 'description',
        }
        mock.onPost(`/${endPoint}`, body).reply(
            201,
            addFacilitiesListResponse(body)
        )
        const result = await store.dispatch(addFacilities(body))
        const facilitiesItem = result.payload
        expect(result.type).toBe('facilities/addFacilities/fulfilled')
        expect(facilitiesItem).toEqual(addFacilitiesListResponse(body))

        const state = store.getState().facilities
        expect(state.entities).toContainEqual(addFacilitiesListResponse(body))
    })

    test('Should be able to edit facilities in list and make put api call and update facilities redux store', async () => {
        const body = {
            id: 1,
            name: 'name',
            description: 'description',
        }
        mock.onPut(`/${endPoint}/${body.id}`, body).reply(
            201,
            editFacilitiesListResponse(body)
        )
        const result = await store.dispatch(editFacilities(body))
        const facilitiesItem = result.payload
        expect(result.type).toBe('facilities/editFacilities/fulfilled')
        expect(facilitiesItem).toEqual(editFacilitiesListResponse(body))

        const state = store.getState().facilities
        let changedFacilities = state.entities.find((p) => p.id === body.id)
        expect(changedFacilities.name).toEqual(body.name)
    })

    test('Should be able to delete facilities in list and update facilities redux store', async () => {
        const input = {
            id: 2,
        }
        mock.onDelete(`/${endPoint}/${input.id}`, input).reply(200)
        let state = store.getState().facilities
        const initialLength = state.entities.length
        const result = await store.dispatch(deleteFacilities(input))
        const deletId = result.payload
        expect(result.type).toBe('facilities/deleteFacilities/fulfilled')
        expect(deletId).toEqual(input.id)

        state = store.getState().facilities
        const updateLength = initialLength - 1
        expect(state.entities.length).toEqual(updateLength)
    })
})
