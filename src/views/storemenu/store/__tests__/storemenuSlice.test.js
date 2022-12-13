import store from 'store/store'
import {
    storemenuAdded,
    storemenuDeleted,
    storemenuUpdated,
} from '../storemenuSlice'

describe('testing storemenu redux store reducers', () => {
    test('add storemenu to store test', () => {
        let state = store.getState().storemenu
        expect(state.entities).toHaveLength(0)
        const initialInput = {
            id: 1,
            storeId: 'storeId',
        }
        store.dispatch(storemenuAdded(initialInput))
        state = store.getState().storemenu
        expect(state.entities).toHaveLength(1)
    })

    test('update storemenu from store should change the length of the entities array in redux store', () => {
        const initialInput = {
            id: 2,
            storeId: 'storeId',
        }
        store.dispatch(storemenuAdded(initialInput))
        let state = store.getState().storemenu
        expect(state.entities).toHaveLength(2)

        const updatedInput = {
            id: initialInput.id,
            storeId: 'storeId1',
        }
        store.dispatch(storemenuUpdated(updatedInput))
        state = store.getState().storemenu
        let changedStoremenu = state.entities.find((p) => p.id === 2)
        expect(changedStoremenu).toStrictEqual(updatedInput)
    })

    test('delete storemenu from store should reduce the length of the entities array in redux store', () => {
        const initialInput = {
            id: 3,
            storeId: 'storeId',
        }
        store.dispatch(storemenuAdded(initialInput))
        let state = store.getState().storemenu
        expect(state.entities).toHaveLength(3)

        store.dispatch(
            storemenuDeleted({
                id: initialInput.id,
            })
        )
        state = store.getState().storemenu
        expect(state.entities).toHaveLength(2)
    })
})
