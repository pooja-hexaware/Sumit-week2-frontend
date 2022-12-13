const {
    render,
    screen,
    fireEvent,
    within,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import EditStoremenu from '../EditStoremenu'
import { storemenuAdded } from '../store/storemenuSlice'
beforeAll(() => {
    store.dispatch(
        storemenuAdded({
            id: 1,
            storeId: 'storeId',
        })
    )
})

beforeEach(() => {
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Navigate to="storemenu/edit/1" replace />
                                }
                            />
                            <Route
                                path="storemenu/edit/:id"
                                element={<EditStoremenu />}
                            />
                        </Routes>
                    </Router>
                </MatxTheme>
            </SettingsProvider>
        </Provider>
    )
})

const clickAndWait = async (element) => {
    await act(async () => {
        fireEvent.click(element)
    })

    await act(async () => {
        jest.runOnlyPendingTimers()
    })
}

afterEach(cleanup)

describe('testing view of StoremenuEdit Component', () => {
    test('should render EditStoremenu and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveStoremenuButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const storeIdElement = screen.getByLabelText(/StoreId/i)

        expect(saveStoremenuButtonElement).toBeInTheDocument()

        expect(storeIdElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Storemenu edit form', async () => {
        const storeIdElement = screen.getByLabelText(/StoreId/i)

        fireEvent.change(storeIdElement, { target: { value: 'storeId' } })

        expect(storeIdElement.value).toBe('storeId')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const storeIdElement = screen.getByLabelText(/StoreId/i)

        fireEvent.change(storeIdElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveStoremenuButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveStoremenuButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(1)
    })
})
