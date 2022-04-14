import React from "react";
import { render, screen, cleanup } from '@testing-library/react'
import Completed from "./Completed";
import { Provider } from "react-redux";
import { store } from "../../store";
import { BrowserRouter } from "react-router-dom";

afterEach(cleanup)

jest.mock('../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn()
    }
})

const Wrapper = ({ children } :any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
}

describe('Completed unit tests', () => {
    afterEach(() => jest.resetAllMocks())
    it('Should mount without errors', async () => {
        render(<Completed />, { wrapper: Wrapper })
        expect(screen.getByRole('main')).toBeTruthy()
    })
})


