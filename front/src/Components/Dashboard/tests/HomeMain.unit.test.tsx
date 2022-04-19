import React from "react";
import { render, screen, cleanup } from '@testing-library/react'
import HomeMain from '../HomeMain'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from '../../../store'
import * as redux from 'react-redux'

jest.mock('../../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' }
    }
})

const Wrapper = ({ children }: any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
}

const spyOnDispatch = jest.spyOn(redux, 'useDispatch')
let mockDispatch = jest.fn()

const spyOnUseSelector = jest.spyOn(redux, 'useSelector')
let mockState = true

describe('HomeMain Unit tests', () => {
    beforeEach(() => spyOnDispatch.mockReturnValue(mockDispatch))
    beforeEach(() => spyOnUseSelector.mockReturnValue(mockState))

    afterEach(jest.clearAllMocks)
    afterEach(cleanup)

    it('Renders without errors', async () => {
        render(<HomeMain />, { wrapper: Wrapper })
        expect(screen.getByText(/issues/i)).toBeInTheDocument()
    })
    it('Shows the correct user name on mount', async() => {
        spyOnUseSelector.mockReturnValueOnce('test')
        render(<HomeMain />, { wrapper: Wrapper })
        expect(screen.getByText(/test/i)).toBeInTheDocument()
    })
})