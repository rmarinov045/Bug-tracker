import * as reducer from './tasksReducer'

jest.mock('../api/taskService', () => {
    return {
        deleteTask: false,
        editTask: false,
        getAllTasks: [ { taskName: 'test', taskType: 'urgent', taskPriority: 'high', id: '1' } ]
    }
})

const mockTask = { taskName: 'test', taskType: 'urgent', taskPriority: 'high', id: '1' }
const mockSecondTask = { taskName: 'test2', taskType: 'urgent', taskPriority: 'high', id: '1' }

const mockTask3 = { taskName: 'test', taskType: 'Major Bug', taskPriority: 'high', id: '2' }
const mockTask4 = { taskName: 'test', taskType: 'Minor Bug', taskPriority: 'low', id: '1' }

const initialState = { tasks: [], loaded: false, filtered: [] }
const initialStateWithTasks = { tasks: [mockTask], loaded: false, filtered: [] }
const initialStateWithList = { tasks: [mockTask, mockSecondTask], loaded: false, filtered: [] }

const stateWithDifferentTypes = { tasks: [mockTask4, mockTask3], loaded: false, filtered: [] }
const stateWithDifferentPriorities = { tasks: [mockTask4, mockTask3], loaded: false, filtered: [] }

describe('getTasks extra reducer unit tests', () => {
    it('Should set fetched tasks to state if fullfilled', async () => {
        const action = { type: reducer.getTasks.fulfilled, payload: [mockTask] }
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ tasks: [mockTask], loaded: true, filtered: [] })
    })
    it('Should set loaded to false if pending', async () => {
        const action = { type: reducer.getTasks.pending, payload: [mockTask] }
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ tasks: [], loaded: false, filtered: [] })
    })
    it('Should reset task list to empty array if rejected', async () => {
        const action = { type: reducer.getTasks.rejected, payload: [mockTask] }
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ tasks: [], loaded: true, filtered: [] })
    })
})

describe('Delete task by id extra reducer unit tests', () => {
    it('Should remove task from state array when fullfiled', async () => {
        const action = { type: reducer.deleteTaskById.fulfilled, payload: '1' }
        const state = reducer.default(initialStateWithTasks, action)

        expect(state).toEqual({ tasks: [], filtered: [], loaded: true })
    })
    it('Should set loaded to false if pending', async () => {
        const action = { type: reducer.deleteTaskById.pending, payload: '1' }
        const state = reducer.default(initialStateWithTasks, action)

        expect(state).toEqual({ tasks: [mockTask], filtered: [], loaded: false })
    })
})

describe('Edit task by id extra reducer unit tests', () => {
    it('Should remove previous task and add new one once fullfilled', async () => {
        const action = { type: reducer.editTaskById.fulfilled, payload: mockSecondTask}
        const state = reducer.default(initialStateWithList, action)

        expect(state).toEqual({ tasks: [mockSecondTask], filtered: [], loaded: true })
    })
    it('Should set loaded to false while pending', async () => {
        const action = { type: reducer.editTaskById.pending, payload: mockSecondTask}
        const state = reducer.default(initialStateWithList, action)

        expect(state).toEqual({ tasks: [mockTask, mockSecondTask], filtered: [], loaded: false })
    })
})

describe('addTask reducer unit tests', () => {
    it('Should add task to state list and set loaded to true when fullfiled', async () => {
        const action = { type: reducer.addTask, payload: mockTask }
        const state = reducer.default(initialState, action)

        expect(state.tasks).toEqual([mockTask])
    })
    it('Should set loaded to true once fullfiled', async () => {
        const action = { type: reducer.addTask, payload: mockTask }
        const state = reducer.default(initialState, action)

        expect(state).toEqual({ tasks: [mockTask], loaded: true, filtered: [] })
    })
})

describe('Update all tasks reducer unit tests', () => {
    it('Should set tasks array to passed payload', () => {
        const action = { type: reducer.updateAllTasks, payload: [mockTask] }
        const state = reducer.default(initialState, action)

        expect(state.tasks).toEqual([mockTask])
    })
    it('Should set loaded to true once fullfilled', () => {
        const action = { type: reducer.updateAllTasks, payload: [mockTask] }
        const state = reducer.default(initialState, action)

        expect(state.loaded).toEqual(true)
    })
})

describe('Sort tasks reducer unit tests', () => {
    it('Should sort tasks by type', async () => {
        const action = { type: reducer.filterTasks, payload: 'Type' }
        const state = reducer.default(stateWithDifferentTypes, action)

        expect(state.tasks[0]).toEqual(mockTask4)
    })
    it('Should sort tasks by priority', async () => {
        const action = { type: reducer.filterTasks, payload: 'Priority' }
        const state = reducer.default(stateWithDifferentPriorities, action)

        expect(state.tasks[0]).toEqual(mockTask4)
    })
    it('Should sort tasks by creation date from most recent if no payload', async () => {
        const action = { type: reducer.filterTasks, payload: '' }
        const state = reducer.default(stateWithDifferentPriorities, action)

        expect(state.tasks[0]).toEqual(mockTask4)
    })
    it('Should set loaded to true if sorting', async () => {
        const action = { type: reducer.filterTasks, payload: 'Type' }
        const state = reducer.default(stateWithDifferentTypes, action)

        expect(state.loaded).toEqual(true)
    })
})

describe('Search tasks reducer unit tests', () => {
    it('Should set filtered list to tasks that match search query by their name', async () => {
        const action = { type: reducer.searchTasks, payload: 'test2' }
        const state = reducer.default(initialStateWithList, action)

        expect(state.filtered).toEqual([mockSecondTask])
    })
})

describe('Reset tasks reducer unit tests', () => {
    it('Should set list and filtered list to empty arrays', async () => {
        const action = { type: reducer.resetTasks, payload: '' }
        const state = reducer.default({ tasks: [mockTask, mockSecondTask], loaded: false, filtered: [mockTask3, mockTask4] }, action)

        expect(state.filtered).toEqual([])
        expect(state.tasks).toEqual([])
    })
})

// missing tests for cases where api requests fail and return error object