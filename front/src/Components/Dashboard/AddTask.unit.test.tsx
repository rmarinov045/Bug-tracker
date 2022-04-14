/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import AddTask from './AddTask'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from '../../store'
import * as redux from 'react-redux'
import { wait } from "@testing-library/user-event/dist/utils";

jest.mock('../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' }
    }
})

jest.mock('../../features/tasksReducer', () => {
    return {
        addTask: (data :any) => jest.fn().mockReturnValue(true)
    }
})

jest.mock('../../api/taskService', () => {
    return {
        createTask: (data :any) => jest.fn().mockReturnValue(true)
    }
})

const spyOnAppDispatch = jest.spyOn(redux, 'useDispatch')
let mockDispatch = jest.fn()

const Wrapper = ({ children } :any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
}

describe('AddTask Component unit tests', () => {
    beforeEach(() => spyOnAppDispatch.mockReturnValue(mockDispatch))
    afterEach(cleanup)

    it('Should render', async () => {
        render(<AddTask visible={() => null} updateModalColor={(() => null)} updateModalMessage={() => null} />, { wrapper: Wrapper })
        expect(screen.getByText('Issue name')).toBeInTheDocument()
    })
    it('Should not submit form with empty input', async () => {
        render(<AddTask visible={() => null} updateModalColor={(() => null)} updateModalMessage={() => null} />, { wrapper: Wrapper })
        fireEvent.click(await screen.findByText('Create'))
        expect(mockDispatch).toBeCalledTimes(0)
    })
    it('Should submit form with fields input', async () => {
        render(<AddTask visible={() => null} updateModalColor={(() => null)} updateModalMessage={() => null} />, { wrapper: Wrapper })

        fireEvent.focus(screen.getAllByRole('textbox')[0])
        fireEvent.change(screen.getAllByRole('textbox')[0], { target: { value: 'Test' }})
        
        const firstDropdown :any = screen.getByRole('form', { name: 'add-task' }).children[3]
        const secondDropdown :any = screen.getByRole('form', { name: 'add-task' }).children[5]

        fireEvent.click(firstDropdown)
        
        fireEvent.click(screen.getAllByRole('listitem')[0])

        await wait()

        fireEvent.click(secondDropdown)
        fireEvent.click(screen.getAllByRole('listitem')[3])

        await wait()

        fireEvent.submit(await screen.findByRole('form', { name: 'add-task' }))

        expect(screen.queryByText('Please')).toBeNull()
        expect(screen.queryByText('Failed')).toBeNull()
    })
})