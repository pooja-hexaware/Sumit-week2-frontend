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
import EditCustomer from '../EditCustomer'
import { customerAdded } from '../store/customerSlice'
beforeAll(() => {
    store.dispatch(
        customerAdded({
            id: 1,
            name: 'name',
            postalcode: 'postalcode',
            city: 'city',
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
                                    <Navigate to="customer/edit/1" replace />
                                }
                            />
                            <Route
                                path="customer/edit/:id"
                                element={<EditCustomer />}
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

describe('testing view of CustomerEdit Component', () => {
    test('should render EditCustomer and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveCustomerButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const postalcodeElement = screen.getByLabelText(/Postalcode/i)
        const cityElement = screen.getByLabelText(/City/i)

        expect(saveCustomerButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(postalcodeElement).toBeInTheDocument()
        expect(cityElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Customer edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const postalcodeElement = screen.getByLabelText(/Postalcode/i)
        const cityElement = screen.getByLabelText(/City/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(postalcodeElement, { target: { value: 'postalcode' } })
        fireEvent.change(cityElement, { target: { value: 'city' } })

        expect(nameElement.value).toBe('name')

        expect(postalcodeElement.value).toBe('postalcode')

        expect(cityElement.value).toBe('city')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const postalcodeElement = screen.getByLabelText(/Postalcode/i)
        const cityElement = screen.getByLabelText(/City/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(postalcodeElement, { target: { value: '' } })
        fireEvent.change(cityElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveCustomerButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveCustomerButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
