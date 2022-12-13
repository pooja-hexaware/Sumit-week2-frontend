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
import AddFacilities from '../AddFacilities'

beforeEach(() => {
    const endPoint = 'facilities'
    const getStudentListResponse = [
        {
            id: 1,
            name: 'name',
            description: 'description',
        },
    ]
    const mock = new MockAdapter(axios)
    mock.onGet(`/${endPoint}`).reply(200, getStudentListResponse)
    render(
        <Provider store={store}>
            <SettingsProvider>
                <MatxTheme>
                    <Router>
                        <AddFacilities />
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

describe('testing view FacilitiesAdd Component', () => {
    test('should render AddFacilities and to display Add Form title', async () => {
        const headingNote = screen.getByText(/Add Form/i)
        expect(headingNote).toBeInTheDocument()
    })

    test('should have all input fields present in the add form', async () => {
        const addFacilitiesButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        expect(addFacilitiesButtonElement).toBeInTheDocument()

        expect(nameElement).toBeInTheDocument()
        expect(descriptionElement).toBeInTheDocument()
    })

    test('should be able to give inputs to all fields of Facilities add form', async () => {
        const nameElement = screen.getByLabelText(/Name/i)
        const descriptionElement = screen.getByLabelText(/Description/i)

        fireEvent.change(nameElement, { target: { value: 'name' } })
        fireEvent.change(descriptionElement, {
            target: { value: 'description' },
        })
    })

    test('should return error message when add Facilities button is clicked on invalid form', async () => {
        jest.useFakeTimers()
        const addFacilitiesButtonElement = screen.getByRole('button', {
            name: /Add/i,
        })

        await clickAndWait(addFacilitiesButtonElement)

        let errorList = await screen.findAllByText('this field is required')
        expect(errorList).toHaveLength(2)
    })
})
