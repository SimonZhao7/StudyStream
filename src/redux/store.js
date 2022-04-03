import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import studySetReducer from './features/studySetSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        studySet: studySetReducer,
    }
})

export default store