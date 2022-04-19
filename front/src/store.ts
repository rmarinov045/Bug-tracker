import { configureStore } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

import storage from 'redux-persist/lib/storage'

import completedTasksReducer from './features/completedTasksReducer';
import userReducer from './features/userReducer'
import tasksReducer from './features/tasksReducer';
import { useDispatch } from "react-redux";
import projectReducer from "./features/projectReducer";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const user = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        completedTasks: completedTasksReducer,
        user,
        projects: projectReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)

export const useAppDispatch = () => useDispatch<typeof store.dispatch>()