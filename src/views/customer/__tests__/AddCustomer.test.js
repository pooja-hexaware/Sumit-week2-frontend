const {
    render,
    screen,
    fireEvent,
    within,
    waitFor,
    getByRole,
    act,
    cleanup,
} = require('@testing-library/react')
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import store from 'store/store'
import { BrowserRouter as Router } from 'react-router-dom'
import { SettingsProvider } from 'common/contexts/SettingsContext'
import { MatxTheme } from 'components'
import axios from '../../../../axios'
import MockAdapter from 'axios-mock-adapter'
import AddCustomer from '../AddCustomer'

beforeEach(() => {
    const endPoint = 'customer'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            postalcode: 'postalcode',
            city: 'city',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddCustomer />
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

describe('testing view CustomerAdd Component', () => {
    test('should render AddCustomer and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addCustomerButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const postalcodeElement = screen.getByLabelText(/Postalcode/i)
        const cityElement = screen.getByLabelText(/City/i)

        expect(addCustomerButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(postalcodeElement).toBeInTheDocument()
        expect(cityElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Customer add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const postalcodeElement = screen.getByLabelText(/Postalcode/i)
        const cityElement = screen.getByLabelText(/City/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(postalcodeElement, { target: { value: 'postalcode' } })
        fireEvent.change(cityElement, { target: { value: 'city' } })
    })

    test('should return error message when add Customer button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addCustomerButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addCustomerButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(3)
    })
})
