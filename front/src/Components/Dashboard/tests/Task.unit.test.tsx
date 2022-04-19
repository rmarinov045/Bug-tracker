/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Task from '../Task'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from '../../../store'
import * as redux from 'react-redux'
import { wait } from "@testing-library/user-event/dist/utils";

jest.mock('../../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' }
    }
})

const mockPromise = new Promise((resolve, reject) => resolve({ status: 'ok' }))

jest.mock('../../../api/taskService', () => {
    return {
        completeTask: (data: any) => jest.fn(() => mockPromise),
        deleteTask: (id: any) => jest.fn(() => mockPromise)
    }
})

const spyOnDispatch = jest.spyOn(redux, 'useDispatch')
let mockDispatch = jest.fn()

const Wrapper = ({ children }: any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
}

const task = { taskName: 'ABCD', authorId: '2', id: '3', project: 'default', taskAuthor: 'testAuthor2', taskDescription: 'testDesc2', taskPriority: 'Low', taskType: 'Minor Bug', completedOn: '4' }

describe('Task Component unit tests', () => {
    beforeEach(() => spyOnDispatch.mockReturnValue(mockDispatch))

    afterEach(cleanup)
    afterEach(jest.clearAllMocks)

    it('Renders without errors', async () => {
        render(<Task task={task} setError={jest.fn} setModalColor={jest.fn} />, { wrapper: Wrapper })
        expect(screen.getByText(/ABCD/i)).toBeInTheDocument()
    })
    it('Deletes task', async () => {
        render(<Task task={task} setError={jest.fn} setModalColor={jest.fn} />, { wrapper: Wrapper })
        const taskMenu: any = document.querySelector('svg')

        fireEvent.click(taskMenu)

        await wait()

        const deleteButton = document.querySelectorAll('svg')[3]

        fireEvent.click(deleteButton)

        expect(mockDispatch).toBeCalled()
    })
    it.skip('Completes task', async () => {
        render(<Task task={task} setError={jest.fn} setModalColor={jest.fn} />, { wrapper: Wrapper })
        const taskMenu: any = document.querySelector('svg')

        fireEvent.click(taskMenu)

        await wait()

        const completeButton = document.querySelectorAll('svg')[1]

        fireEvent.click(completeButton)

        expect(mockDispatch).toBeCalled()
    })
    it('Opens edit field', async () => {
        render(<Task task={task} setError={jest.fn} setModalColor={jest.fn} />, { wrapper: Wrapper })

        const taskMenu: any = document.querySelector('svg')

        fireEvent.click(taskMenu)

        await wait()

        const editButton = document.querySelectorAll('svg')[2]

        fireEvent.click(editButton)

        expect(screen.getByText(/edit/i)).toBeInTheDocument()
    })
})