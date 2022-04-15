import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import EditTask from './EditTask'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from '../../store'
import * as redux from 'react-redux'

const task = { taskName: 'testName', authorId: '1', id: '2', project: 'default', taskAuthor: 'testAuthor', taskDescription: 'testDesc', taskPriority: 'High', taskType: 'Major Bug', completedOn: '3' }

jest.mock('../../firebase', () => {
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

describe('Edit Task Component unit tests', () => {
    beforeEach(() => spyOnDispatch.mockReturnValue(mockDispatch))

    afterEach(jest.clearAllMocks)
    afterEach(cleanup)

    it('Mounts without errors', async () => {
        render(<EditTask task={task} visible={jest.fn()} />, { wrapper: Wrapper })
        expect(screen.queryAllByRole('textbox')[0]).toHaveValue('testName')
    })
    it('Does not submit if any of the fields are empty', async () => {
        render(<EditTask task={task} visible={jest.fn()} />, { wrapper: Wrapper })
        fireEvent.change(screen.getAllByRole('textbox')[0], { event: { target: '' } })
        expect(mockDispatch).toBeCalledTimes(0)
    })
    it('Submits if all fields are filled', async() => {
        render(<EditTask task={task} visible={jest.fn()} />, { wrapper: Wrapper })
        fireEvent.click(screen.getByText('Confirm'))
        expect(mockDispatch).toBeCalled()
    })
})
