import Projects from "../Projects";
import React from "react";
import { render, screen, cleanup } from '@testing-library/react'
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from '../../../store'

const Wrapper = ({ children }: any) => {
    return <Provider store={store}>
        <MemoryRouter>
            <Routes>
                <Route path="/" element={children} />
            </Routes>
        </MemoryRouter>
    </Provider>
}

jest.mock('../../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' },
        reload: jest.fn,
    }
})

let mockDispatch = jest.fn()

jest.mock('../../../store', () => {
    return {
        ...jest.requireActual('../../../store'),
        useAppDispatch: () => mockDispatch
    }
}
)

describe('Projects component unit tests', () => {
    afterEach(cleanup)
    it('renders without errors', () => {
        render(<Projects />, { wrapper: Wrapper })
        expect(screen.getByText('Projects:')).toBeInTheDocument()
    })
    it('fetches projects on load', () => {
        render(<Projects />, { wrapper: Wrapper })
        expect(mockDispatch).toBeCalled()
    })
})