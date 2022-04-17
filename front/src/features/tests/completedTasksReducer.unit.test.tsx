import * as reducer from '../completedTasksReducer'

jest.mock('../../api/taskService', () => {
    return {
        getAllCompletedTasksByIdAndProject: () => Promise.resolve(mockPayload)
    }
})

const mockPayload = [{ taskName: 'test' }]

const initialState = { completed: [], filtered: [], loaded: false }

const initialStateWithCompletedTasks = { completed: [{ taskName: 'test' }], filtered: [], loaded: false }

describe('getCompletedTasksByUserIdAndProject reducer unit test', () => {
    it('should return tasks if successful', async () => {
        const action = { type: reducer.getCompletedTasksByUserIdAndProject.fulfilled, payload: mockPayload }
        const state = reducer.default(initialState, action)
        
        expect(state).toEqual({ completed: mockPayload, filtered: [], loaded: true })
    })
    it('should return empty array if failed', async () => {
        const action = { type: reducer.getCompletedTasksByUserIdAndProject, payload: { userId: '', projectId: '1' } }
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ completed: [], filtered: [], loaded: false })
    })
    it('Should set loaded to false while pending', async () => {
        const action = { type: reducer.getCompletedTasksByUserIdAndProject.pending, payload: mockPayload }
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ completed: [], filtered: [], loaded: false })
    })
})

describe('Search Completed tasks reducer unit tests', () => {
    it('should return tasks which match the provided name', async () => {
        const action = { type: reducer.searchCompletedTasks, payload: 'test' }
        const state = reducer.default(initialStateWithCompletedTasks, action)

        expect(state).toEqual({ completed: initialStateWithCompletedTasks.completed, filtered: mockPayload, loaded: false })
    })
    it('Should return empty array if no search results', async () => {
        const action = { type: reducer.searchCompletedTasks, payload: 'blabla' }
        const state = reducer.default(initialStateWithCompletedTasks, action)

        expect(state).toEqual({ completed: initialStateWithCompletedTasks.completed, filtered: [], loaded: false })
    })
})

describe('resetCompletedTasks reducer unit tests', () => {
    it('should reset completed tasks to empty array when fullfilled', async () => {
        const action = { type: reducer.resetCompletedTasks, payload: 'test' }
        const state = reducer.default(initialStateWithCompletedTasks, action)

        expect(state).toEqual({ completed: [], filtered: [], loaded: true })
    })
    it('should set loaded to true when fullfilled', async () => {
        const action = { type: reducer.resetCompletedTasks, payload: 'test' }
        const state = reducer.default(initialStateWithCompletedTasks, action)

        expect(state).toEqual({ completed: [], filtered: [], loaded: true })
    })
})

