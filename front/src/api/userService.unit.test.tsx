import axios from 'axios'
import * as user from './userService'

jest.mock('../firebase', () => {
    return {
        auth: jest.fn().mockReturnThis(),
        onAuthStateChanged: jest.fn(),
        currentUser: { userId: 'test' },
    }
})

const mockUser = { firstName: 'test', lastName: 'test2', company: 'test', position: 'test', email: 'test', password: 'test', userId: 'test' }

describe('Post user unit tests', () => {
    it('returns true on success', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 200 })
        expect(await user.postUser(mockUser)).toEqual(true)
    })
    it('returns false if error', async () => {
        axios.post = jest.fn().mockResolvedValue({ status: 199 })
        expect(await user.postUser(mockUser)).toEqual(false)
    })
})

describe('Get user unit tests', () => {
    it('returns user on success', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: mockUser, status: 200 })
        expect(await user.getUser('email')).toEqual(Object.values(mockUser))
    })
    it('returns false if error', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 199 })
        expect(await user.getUser('email')).toEqual(false)
    })
})

describe('Get user db ib unit tests', () => {
    it('returns id on success', async () => {
        axios.get = jest.fn().mockResolvedValue({ data: { testID: mockUser }, status: 200 })
        expect(await user.getUserDBId('email')).toEqual("testID")
    })
    it('returns false if error', async () => {
        axios.get = jest.fn().mockResolvedValue({ status: 199 })
        expect(await user.getUserDBId('email')).toEqual(false)
    })
})

describe('Update user unit tests', () => {
    it('returns user on success', async () => {
        axios.patch = jest.fn().mockResolvedValue({ data: { testID: mockUser }, status: 200 })
        expect(await user.updateUser(mockUser)).toEqual({ testID: mockUser })
    })
    it('returns error message if error', async () => {
        axios.patch = jest.fn().mockResolvedValue({ status: 199, data: { message: 'error' } })
        expect(await user.updateUser(mockUser)).toEqual('error')
    })
})

describe('Update user image unit tests', () => {
    it('returns response object on success', async () => {
        axios.patch = jest.fn().mockResolvedValue({ data: { testID: mockUser }, status: 200 })
        expect(await user.updateUserImage('url')).toEqual({ data: { testID: mockUser }, status: 200 })
    })
    it('returns error message if error', async () => {
        axios.patch = jest.fn().mockResolvedValue({ status: 199, data: { message: 'error' } })
        expect(await user.updateUserImage('url')).toEqual('error')
    })
})

describe('Delete user image unit tests', () => {
    it('returns response object on success', async () => {
        axios.patch = jest.fn().mockResolvedValue({ data: { testID: mockUser }, status: 200 })
        expect(await user.deleteUserImage()).toEqual({ data: { testID: mockUser }, status: 200 })
    })
    it('returns error message if error', async () => {
        axios.patch = jest.fn().mockResolvedValue({ status: 199, data: { message: 'error' } })
        expect(await user.deleteUserImage()).toEqual('error')
    })
})

// tests for firebase must be done via FB emulator


