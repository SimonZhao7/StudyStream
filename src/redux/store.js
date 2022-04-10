import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import studySetReducer from './features/studySetSlice';
import studySetsReducer from "./features/studySetsSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        studySet: studySetReducer,
        studySets: studySetsReducer,
    }
})

export default store