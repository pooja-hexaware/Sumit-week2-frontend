import store from 'store/store'
import {
    customerAdded,
    customerDeleted,
    customerUpdated,
} from '../customerSlice'

describe('testing customer redux store reducers', () => {
    test('add customer to store test', () => {
        let state = store.getState().customer
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            postalcode: 'postalcode',
            city: 'city',
        }
        store.dispatch(customerAdded(initialInput))
        state = store.getState().customer
        expect(state.entities).toHaveLength(1)
    })

    test('update customer from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            postalcode: 'postalcode',
            city: 'city',
        }
        store.dispatch(customerAdded(initialInput))
        let state = store.getState().customer
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            postalcode: 'postalcode1',
            city: 'city1',
        }
        store.dispatch(customerUpdated(updatedInput))
        state = store.getState().customer
        let changedCustomer = state.entities.find((p) => p.id === 2)
        expect(changedCustomer).toStrictEqual(updatedInput)
    })

    test('delete customer from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            postalcode: 'postalcode',
            city: 'city',
        }
        store.dispatch(customerAdded(initialInput))
        let state = store.getState().customer
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            customerDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().customer
        expect(state.entities).toHaveLength(2)
    })
})
