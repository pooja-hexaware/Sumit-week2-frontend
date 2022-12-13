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
import AddStore from '../AddStore'

beforeEach(() => {
    const endPoint = 'store'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            address: 'address',
            zip: 'zip',
            city: 'city',
            stateName: 'stateName',
            storePhone: 'storePhone',
            kitchenPhone: 'kitchenPhone',
            isActive: true,
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddStore />
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

describe('testing view StoreAdd Component', () => {
    test('should render AddStore and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addStoreButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const zipElement = screen.getByLabelText(/Zip/i)
        const cityElement = screen.getByLabelText(/City/i)
        const stateNameElement = screen.getByLabelText(/StateName/i)
        const storePhoneElement = screen.getByLabelText(/StorePhone/i)
        const kitchenPhoneElement = screen.getByLabelText(/KitchenPhone/i)
        const isActiveElement = screen.getByLabelText(/IsActive/i)

        expect(addStoreButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
        expect(zipElement).toBeInTheDocument()
        expect(cityElement).toBeInTheDocument()
        expect(stateNameElement).toBeInTheDocument()
        expect(storePhoneElement).toBeInTheDocument()
        expect(kitchenPhoneElement).toBeInTheDocument()
        expect(isActiveElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Store add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const zipElement = screen.getByLabelText(/Zip/i)
        const cityElement = screen.getByLabelText(/City/i)
        const stateNameElement = screen.getByLabelText(/StateName/i)
        const storePhoneElement = screen.getByLabelText(/StorePhone/i)
        const kitchenPhoneElement = screen.getByLabelText(/KitchenPhone/i)
        const isActiveElement = screen.getByLabelText(/IsActive/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(addressElement, { target: { value: 'address' } })
        fireEvent.change(zipElement, { target: { value: 'zip' } })
        fireEvent.change(cityElement, { target: { value: 'city' } })
        fireEvent.change(stateNameElement, { target: { value: 'stateName' } })
        fireEvent.change(storePhoneElement, { target: { value: 'storePhone' } })
        fireEvent.change(kitchenPhoneElement, {
            target: { value: 'kitchenPhone' },
        })

        fireEvent.mouseDown(isActiveElement)
        const isActivelistbox = within(screen.getByRole('listbox'))
        fireEvent.click(isActivelistbox.getByText(/False/))
        expect(isActiveElement).toHaveTextContent(/False/i)
    })

    test('should return error message when add Store button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addStoreButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addStoreButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(8)
    })
})
