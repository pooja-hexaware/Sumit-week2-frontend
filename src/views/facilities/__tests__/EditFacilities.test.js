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
import EditFacilities from '../EditFacilities'
import { facilitiesAdded } from '../store/facilitiesSlice'
beforeAll(() => {
    store.dispatch(
        facilitiesAdded({
            id: 1,
            name: 'name',
            description: 'description',
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
                                    <Navigate to="facilities/edit/1" replace />
                                }
                            />
                            <Route
                                path="facilities/edit/:id"
                                element={<EditFacilities />}
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

describe('testing view of FacilitiesEdit Component', () => {
    test('should render EditFacilities and display the heading Edit Form', async () => {
        const headingNote = screen.getByText(/Edit Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the edit form', async () => {
        const saveFacilitiesButtonElement = screen.getByRole('button', {
            name: /save/i,
        })
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        expect(saveFacilitiesButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Facilities edit form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })

        expect(nameElement.value).toBe('name')

        expect(descriptionElement.value).toBe('description')
    })

    test('should return error message when save button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        fireEvent.change(nameElement, { target: { value: '' } })
        fireEvent.change(descriptionElement, { target: { value: '' } })
        await act(async () => {
            jest.runOnlyPendingTimers()
        })
        const saveFacilitiesButtonElement = screen.getByRole('button', {
            name: /save/i,
        })

        await clickAndWait(saveFacilitiesButtonElement)

        const errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
