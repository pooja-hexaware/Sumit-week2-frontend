import store from 'store/store'
import { storeAdded, storeDeleted, storeUpdated } from '../storeSlice'

describe('testing store redux store reducers', () => {
    test('add store to store test', () => {
        let state = store.getState().store
        expect(state.entities).toHaveLength(0)
        const initialInput = {
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
        store.dispatch(storeAdded(initialInput))
        state = store.getState().store
        expect(state.entities).toHaveLength(1)
    })

    test('update store from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            address: 'address',
            zip: 'zip',
            city: 'city',
            stateName: 'stateName',
            storePhone: 'storePhone',
            kitchenPhone: 'kitchenPhone',
            isActive: false,
        }
        store.dispatch(storeAdded(initialInput))
        let state = store.getState().store
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            address: 'address1',
            zip: 'zip1',
            city: 'city1',
            stateName: 'stateName1',
            storePhone: 'storePhone1',
            kitchenPhone: 'kitchenPhone1',
            isActive: true,
        }
        store.dispatch(storeUpdated(updatedInput))
        state = store.getState().store
        let changedStore = state.entities.find((p) => p.id === 2)
        expect(changedStore).toStrictEqual(updatedInput)
    })

    test('delete store from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            address: 'address',
            zip: 'zip',
            city: 'city',
            stateName: 'stateName',
            storePhone: 'storePhone',
            kitchenPhone: 'kitchenPhone',
            isActive: false,
        }
        store.dispatch(storeAdded(initialInput))
        let state = store.getState().store
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            storeDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().store
        expect(state.entities).toHaveLength(2)
    })
})
