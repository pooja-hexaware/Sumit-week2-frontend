import store from 'store/store'
import {
    allowedtoppingsAdded,
    allowedtoppingsDeleted,
    allowedtoppingsUpdated,
} from '../allowedtoppingsSlice'

describe('testing allowedtoppings redux store reducers', () => {
    test('add allowedtoppings to store test', () => {
        let state = store.getState().allowedtoppings
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            name: 'name',
            price: 'price',
        }
        store.dispatch(allowedtoppingsAdded(initialInput))
        state = store.getState().allowedtoppings
        expect(state.entities).toHaveLength(1)
    })

    test('update allowedtoppings from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            name: 'name',
            price: 'price',
        }
        store.dispatch(allowedtoppingsAdded(initialInput))
        let state = store.getState().allowedtoppings
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            name: 'name1',
            price: 'price1',
        }
        store.dispatch(allowedtoppingsUpdated(updatedInput))
        state = store.getState().allowedtoppings
        let changedAllowedtoppings = state.entities.find((p) => p.id === 2)
        expect(changedAllowedtoppings).toStrictEqual(updatedInput)
    })

    test('delete allowedtoppings from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            name: 'name',
            price: 'price',
        }
        store.dispatch(allowedtoppingsAdded(initialInput))
        let state = store.getState().allowedtoppings
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            allowedtoppingsDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().allowedtoppings
        expect(state.entities).toHaveLength(2)
    })
})
