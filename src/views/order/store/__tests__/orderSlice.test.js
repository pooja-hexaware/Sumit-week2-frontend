import store from 'store/store'
import { orderAdded, orderDeleted, orderUpdated } from '../orderSlice'

describe('testing order redux store reducers', () => {
    test('add order to store test', () => {
        let state = store.getState().order
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            orderDate: 'orderDate',
        }
        store.dispatch(orderAdded(initialInput))
        state = store.getState().order
        expect(state.entities).toHaveLength(1)
    })

    test('update order from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            orderDate: 'orderDate',
        }
        store.dispatch(orderAdded(initialInput))
        let state = store.getState().order
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            orderDate: 'orderDate1',
        }
        store.dispatch(orderUpdated(updatedInput))
        state = store.getState().order
        let changedOrder = state.entities.find((p) => p.id === 2)
        expect(changedOrder).toStrictEqual(updatedInput)
    })

    test('delete order from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            orderDate: 'orderDate',
        }
        store.dispatch(orderAdded(initialInput))
        let state = store.getState().order
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            orderDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().order
        expect(state.entities).toHaveLength(2)
    })
})
