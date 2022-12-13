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
import EditStore from '../EditStore'
import { storeAdded } from '../store/storeSlice'
beforeAll(() => {
    store.dispatch(
        storeAdded({
            id: 1,
            name: 'name',
            address: 'address',
            zip: 'zip',
            city: 'city',
            stateName: 'stateName',
            storePhone: 'storePhone',
            kitchenPhone: 'kitchenPhone',
            isActive: false,
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
                                element={<Navigate to="store/edit/1" replace />}
                            />
                            <Route
                                path="store/edit/:id"
                                element={<EditStore />}
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

describe('testing view of StoreEdit Component', () => {
    test('should render EditStore and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveStoreButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const zipElement = screen.getByLabelText(/Zip/i)
        const cityElement = screen.getByLabelText(/City/i)
        const stateNameElement = screen.getByLabelText(/StateName/i)
        const storePhoneElement = screen.getByLabelText(/StorePhone/i)
        const kitchenPhoneElement = screen.getByLabelText(/KitchenPhone/i)
        const isActiveElement = screen.getByLabelText(/IsActive/i)

        expect(saveStoreButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(addressElement).toBeInTheDocument()
        expect(zipElement).toBeInTheDocument()
        expect(cityElement).toBeInTheDocument()
        expect(stateNameElement).toBeInTheDocument()
        expect(storePhoneElement).toBeInTheDocument()
        expect(kitchenPhoneElement).toBeInTheDocument()
        expect(isActiveElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Store edit form', async () => {
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

        expect(nameElement.value).toBe('name')

        expect(addressElement.value).toBe('address')

        expect(zipElement.value).toBe('zip')

        expect(cityElement.value).toBe('city')

        expect(stateNameElement.value).toBe('stateName')

        expect(storePhoneElement.value).toBe('storePhone')

        expect(kitchenPhoneElement.value).toBe('kitchenPhone')

        fireEvent.mouseDown(isActiveElement)
        const isActivelistbox = within(screen.getByRole('listbox'))
        fireEvent.click(isActivelistbox.getByText(/True/))
        expect(isActiveElement).toHaveTextContent(/True/i)
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const addressElement = screen.getByLabelText(/Address/i)
        const zipElement = screen.getByLabelText(/Zip/i)
        const cityElement = screen.getByLabelText(/City/i)
        const stateNameElement = screen.getByLabelText(/StateName/i)
        const storePhoneElement = screen.getByLabelText(/StorePhone/i)
        const kitchenPhoneElement = screen.getByLabelText(/KitchenPhone/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(addressElement, { target: { value: '' } })
        fireEvent.change(zipElement, { target: { value: '' } })
        fireEvent.change(cityElement, { target: { value: '' } })
        fireEvent.change(stateNameElement, { target: { value: '' } })
        fireEvent.change(storePhoneElement, { target: { value: '' } })
        fireEvent.change(kitchenPhoneElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveStoreButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveStoreButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(7)
    })
})
