import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/userSlice'
import studySetReducer from './features/studySetSlice'
import studySetsReducer from './features/studySetsSlice'
import searchSetReducer from './features/searchSetSlice'
import spotifyReducer from './features/spotifySlice'
import spotifySearchReducer from './features/spotifySearchSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        studySet: studySetReducer,
        studySets: studySetsReducer,
        searchSet: searchSetReducer,
        spotify: spotifyReducer,
        spotifySearch: spotifySearchReducer,
    },
})

export default store