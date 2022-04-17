import React from "react";
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import CompletedContainer from '../CompletedContainer'
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from '../../../store'
import * as redux from 'react-redux'

afterEach(cleanup)

const user = { value: { userId: '1', firstName: 'testName' } }

const task1 = { taskName: 'testName', authorId: '1', id: '2', project: 'default', taskAuthor: 'testAuthor', taskDescription: 'testDesc', taskPriority: 'High', taskType: 'Major Bug', completedOn: '3' }
const task2 = { taskName: 'ABCD', authorId: '2', id: '3', project: 'default', taskAuthor: 'testAuthor2', taskDescription: 'testDesc2', taskPriority: 'Low', taskType: 'Minor Bug', completedOn: '4' }

const tasks = [task1, task2]

const mockState = { user: user, completedTasks: { completed: tasks } }

const spyOnUseSelector = jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(mockState))

const spyOnUseAppDispatch = jest.spyOn(redux, 'useDispatch')
let mockDispatch = jest.fn()


const spyOnUseEffect = jest.spyOn(React, 'useEffect')

const Wrapper = ({ children }: any) => {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
}

jest.mock('../../../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' }
    }
})

const project = { name: 'testingProject', id: '1' }

describe('Completed tasks container rendering tests', () => {

    beforeEach(() => spyOnUseEffect.mockImplementation(cb => cb()))
    beforeEach(() => spyOnUseSelector.mockReturnValue(mockState))
    beforeEach(() => spyOnUseAppDispatch.mockReturnValue(mockDispatch))
    beforeEach(() => mockDispatch.mockReturnValue([{ taskName: 'testName' }]))

    afterEach(() => jest.resetAllMocks())

    it('Should mount without errors with a project passed in', async () => {
        render(<CompletedContainer project={project} />, { wrapper: Wrapper })
        expect(await screen.findByText('Resolved issues:')).toBeTruthy()
    })
    it('Should display placeholder text if there are no completed tasks for the user and project', async () => {
        render(<CompletedContainer project={project} />, { wrapper: Wrapper })
        expect(await screen.findByText('Nothing yet...')).toBeTruthy()
    })
    it('Should not display charts if there are no tasks for current user and project', async () => {
        render(<CompletedContainer project={project} />, { wrapper: Wrapper })
        expect(screen.queryByRole('complementary')).toBeNull()
    })
})

describe('Completed tasks container rendering tasks tests', () => {

    beforeEach(() => spyOnUseEffect.mockImplementation(cb => cb()))
    beforeEach(() => spyOnUseSelector.mockReturnValue(tasks))
    beforeEach(() => spyOnUseAppDispatch.mockReturnValue(mockDispatch))

    afterEach(() => jest.resetAllMocks())

    it('Should render a task when there are tasks for current user and project', async () => {
        render(<CompletedContainer project={project} />, { wrapper: Wrapper })
        expect(await screen.findByText('testName')).toBeTruthy()
    })
    it('Should render charts when there are tasks for current user and project', async () => {
        render(<CompletedContainer project={project} />, { wrapper: Wrapper })
        expect(screen.getByRole('complementary')).toBeTruthy()
    })
    it('Should show task details when user clicks on task', async () => {
        render(<CompletedContainer project={project} />, { wrapper: Wrapper })
        fireEvent.click(screen.getAllByRole('listitem')[1])
        expect(screen.getByText('testDesc')).toBeInTheDocument()
    })
})

describe('Completed tasks container tasks filtering tests', () => {

    beforeEach(() => spyOnUseEffect.mockImplementation(cb => cb()))
    beforeEach(() => spyOnUseAppDispatch.mockReturnValue(mockDispatch))
    beforeEach(() => spyOnUseSelector.mockImplementation(cb => cb({ user: { value: { userId: '1' } }, completedTasks: { completed: [], filtered: tasks, loaded: true }, tasks: {loaded: true} })))

    afterEach(() => jest.resetAllMocks())

    it('Should fill search bar with search query', async () => {
        render(<CompletedContainer project={project} />, { wrapper: Wrapper })
        fireEvent.focus(screen.getByRole('textbox'))
        fireEvent.input(screen.getByRole('textbox'), { target: { value: 'testName2' } })
        const inputElement :HTMLInputElement | null = screen.queryByRole('textbox')
        expect(inputElement?.value).toEqual('testName2')
    })
    it('Should dispatch on key press in search field', async () => {
        render(<CompletedContainer project={project} />, { wrapper: Wrapper })
        fireEvent.focus(screen.getByRole('textbox'))
        fireEvent.input(screen.getByRole('textbox'), { target: { value: 'testName2' } })
        expect(mockDispatch).toHaveBeenCalled()
    })
    
})