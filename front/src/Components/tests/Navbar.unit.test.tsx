/* eslint-disable testing-library/no-unnecessary-act */
import Navbar from "../Navbar";
import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Provider } from "react-redux";
import * as state from '../../store'
import { MemoryRouter } from "react-router-dom";

const Wrapper = ({ children }: any) => {
    return <Provider store={state.store}>
        <MemoryRouter>
            {children}
        </MemoryRouter>
    </Provider>
}

jest.mock('../../firebase', () => {
    return {
        onAuthStateChanged: jest.fn(),
        reload: jest.fn,
        auth: () => jest.fn().mockReturnThis()
    }
})

const spyOnDispatch = jest.spyOn(state, 'useAppDispatch')
let mockDispatch = jest.fn()

describe('Navbar unit tests', () => {

    beforeEach(() => spyOnDispatch.mockReturnValue(mockDispatch))
    afterEach(cleanup)

    it('renders without errors', () => {
        render(<Navbar />, { wrapper: Wrapper })
        expect(screen.getByRole('img')).toBeInTheDocument()
    })
    it('handles color mode changes', async () => {
        render(<Navbar />, { wrapper: Wrapper })
        fireEvent.click(await screen.findByTestId('mode'))

        expect(mockDispatch).toBeCalled()
    })
})

// need to mock FB auth