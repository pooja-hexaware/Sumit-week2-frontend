import store from 'store/store'
import {
    facilitiesAdded,
    facilitiesDeleted,
    facilitiesUpdated,
} from '../facilitiesSlice'

describe('testing facilities redux store reducers', () => {
    test('add facilities to store test', () => {
        let state = store.getState().facilities
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            description: 'description',
        }
        store.dispatch(facilitiesAdded(initialInput))
        state = store.getState().facilities
        expect(state.entities).toHaveLength(1)
    })

    test('update facilities from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            description: 'description',
        }
        store.dispatch(facilitiesAdded(initialInput))
        let state = store.getState().facilities
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            description: 'description1',
        }
        store.dispatch(facilitiesUpdated(updatedInput))
        state = store.getState().facilities
        let changedFacilities = state.entities.find((p) => p.id === 2)
        expect(changedFacilities).toStrictEqual(updatedInput)
    })

    test('delete facilities from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            description: 'description',
        }
        store.dispatch(facilitiesAdded(initialInput))
        let state = store.getState().facilities
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            facilitiesDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().facilities
        expect(state.entities).toHaveLength(2)
    })
})
