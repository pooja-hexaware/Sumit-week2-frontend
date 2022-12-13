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
import EditMenu from '../EditMenu'
import { menuAdded } from '../store/menuSlice'
beforeAll(() => {
    store.dispatch(
        menuAdded({
            id: 1,
            name: 'name',
            description: 'description',
            amount: 'amount',
            quantity: 'quantity',
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
                                element={<Navigate to="menu/edit/1" replace />}
                            />
                            <Route
                                path="menu/edit/:id"
                                element={<EditMenu />}
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

describe('testing view of MenuEdit Component', () => {
    test('should render EditMenu and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveMenuButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const amountElement = screen.getByLabelText(/Amount/i)
        const quantityElement = screen.getByLabelText(/Quantity/i)

        expect(saveMenuButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
        expect(amountElement).toBeInTheDocument()
        expect(quantityElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Menu edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const amountElement = screen.getByLabelText(/Amount/i)
        const quantityElement = screen.getByLabelText(/Quantity/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })
        fireEvent.change(amountElement, { target: { value: 'amount' } })
        fireEvent.change(quantityElement, { target: { value: 'quantity' } })

        expect(nameElement.value).toBe('name')

        expect(descriptionElement.value).toBe('description')

        expect(amountElement.value).toBe('amount')

        expect(quantityElement.value).toBe('quantity')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)
        const amountElement = screen.getByLabelText(/Amount/i)
        const quantityElement = screen.getByLabelText(/Quantity/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(descriptionElement, { target: { value: '' } })
        fireEvent.change(amountElement, { target: { value: '' } })
        fireEvent.change(quantityElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveMenuButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveMenuButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(4)
    })
})
