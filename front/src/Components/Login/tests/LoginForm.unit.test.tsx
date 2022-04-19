import LoginForm from "../LoginForm";
import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from '../../../store'
import * as redux from 'react-redux'

const Wrapper = ({ children }: any) => {
    return <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route path="/admin"></Route>
                <Route path="/" element={children}></Route>
            </Routes>
        </BrowserRouter>
    </Provider>
}

const spyOnDispatch = jest.spyOn(redux, 'useDispatch')
let mockDispatch = jest.fn()

// const spyOnNavigate = jest.spyOn(router, 'useNavigate')
let mockUseNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockUseNavigate,
}))

jest.mock('../../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' },
        reload: jest.fn,
    }
})

jest.mock('../../../auth/auth', () => {
    return {
        login: (data: any) => jest.fn().mockReturnValue(true)
    }
})

describe('Login form unit tests', () => {

    beforeEach(() => spyOnDispatch.mockReturnValue(mockDispatch))
    // beforeEach(() => spyOnNavigate.mockReturnValue(mockNavigate))

    afterEach(() => cleanup())

    it('Renders without errors', async () => {
        render(<LoginForm />, { wrapper: Wrapper })
        expect(screen.getByText('Login')).toBeInTheDocument()
    })
    it('Does not call dispatch if there is no user or password', async () => {
        render(<LoginForm />, { wrapper: Wrapper })
        fireEvent.click(screen.getByText('Login'))
        expect(mockDispatch).toBeCalledTimes(0)
    })
    it('Does not call dispatch if email does not contain @ symbol', () => {
        render(<LoginForm />, { wrapper: Wrapper })
        fireEvent.input(screen.getAllByRole('textbox')[0], 'test')
        fireEvent.click(screen.getByText('Login'))
        expect(mockDispatch).toBeCalledTimes(0)
    })
    it.skip('calls dispatch with valid fields', async () => {
        React.useState = jest.fn().mockImplementationOnce((x: any) => ['test@test.com', () => null])

        render(<LoginForm />, { wrapper: Wrapper })
        fireEvent.input(screen.getAllByRole('textbox')[0], 'test@test.test')
        fireEvent.input(screen.getByPlaceholderText('**********'), '123456')
        fireEvent.click(screen.getByText('Login'))
        expect(mockDispatch).toBeCalledTimes(2)
        expect(mockUseNavigate).toBeCalledTimes(1)
    })
})

// Cannot mock useNavigate properly