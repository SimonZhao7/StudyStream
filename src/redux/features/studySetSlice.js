import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// API
import AXIOS from '../../api'

export const fetchStudySet = createAsyncThunk(
    'studySetSlice/fetchStudySet',
    async (id) => {
        const token = localStorage.getItem('jwt')
        const response = await AXIOS.get(`/studysets/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (response.status === 200) {
            return response.data
        }
    }
)
const initialState = {
    loading: true,
    flashcardFormOpen: false,
    editable: true,
    studySet: {},
}

const studySetSlice = createSlice({
    name: 'studySet',
    initialState,
    reducers: {
        showFlashcardForm: (state) => {
            state.flashcardFormOpen = true
        },
        hideFlashcardForm: (state) => {
            state.flashcardFormOpen = false
        },
        addFlashcard: (state, action) => {
            state.studySet.flashcards.push(action.payload)
        },
        removeFlashcard: (state, action) => {
            state.studySet.flashcards.splice(action.payload, 1)
        },
    },
    extraReducers: {
        [fetchStudySet.pending]: (state) => {
            state.loading = true
        },
        [fetchStudySet.fulfilled]: (state, action) => {
            state.studySet = action.payload.studySet
            state.editable = action.payload.editable
            state.loading = false
        },
        [fetchStudySet.rejected]: (state) => {
            state.loading = false
        },
    },
})

export const {
    showFlashcardForm,
    hideFlashcardForm,
    addFlashcard,
    removeFlashcard,
} = studySetSlice.actions

export default studySetSlice.reducer