import ProfileCard from "../ProfileCard";
import React from "react";
import { render, screen, cleanup } from '@testing-library/react'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from '../../../store'
import * as redux from 'react-redux'

const Wrapper = ({ children }: any) => {
    return <Provider store={store}>
        <MemoryRouter>
            <Routes>
                <Route path="/" element={children} />
            </Routes>
        </MemoryRouter>
    </Provider>
}

const spyOnDispatch = jest.spyOn(redux, 'useDispatch')
let mockDispatch = jest.fn()

const spyOnUseEffect = jest.spyOn(React, 'useEffect')
let mockUseEffect = jest.fn()

const spyOnUseSelector = jest.spyOn(redux, 'useSelector')

const mockUser = { firstName: 'test', lastName: 'test last', position: 'testPosition', company: 'testCo', email: 'testMail' }

jest.mock('../../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' },
        reload: jest.fn,
    }
})

describe('Profile card unit tests', () => {

    beforeEach(() => spyOnDispatch.mockReturnValue(mockDispatch))
    beforeEach(() => spyOnUseEffect.mockImplementation(() => mockUseEffect))
    beforeEach(() => spyOnUseSelector.mockReturnValue('test'))

    afterEach(cleanup)

    it('renders correct data withour errors', () => {
        render(<ProfileCard updateModal={jest.fn} user={mockUser} />, { wrapper: Wrapper })
        expect(screen.getByText('@testCo')).toBeInTheDocument()
    })
    it('renders profile image loader initially', () => {       
        render(<ProfileCard updateModal={jest.fn} user={mockUser} />, { wrapper: Wrapper })
        expect(screen.queryByRole('img')).toBeNull()
    })
    it('calls dispatch to fetch image', async () => {
        render(<ProfileCard updateModal={jest.fn} user={mockUser} />, { wrapper: Wrapper })
        expect(mockDispatch).toBeCalled()
    })
})

// missing tests for image upload and rendering