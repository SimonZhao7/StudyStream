import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// API
import AXIOS from '../../api'

export const fetchStudySets = createAsyncThunk(
    'studySets/fetchStudySets',
    async (queryString) => {
        const token = localStorage.getItem('jwt')
        const response = await AXIOS.get(`/studysets${queryString}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.status === 200) {
            return response.data
        }
    }
)

export const deleteStudySet = createAsyncThunk(
    'studySetSlice/deleteStudySet',
    async (studySetId) => {
        const token = localStorage.getItem('jwt')
        const response = await AXIOS.delete(`/studysets/${studySetId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.status === 200) {
            return studySetId
        }
    }
)

const initialState = {
    loading: true,
    value: [],
    page: 1,
    maxPages: 0,
}

const studySetsSlice = createSlice({
    name: 'studySets',
    initialState,
    reducers: {
        goToPage: (state, action) => {
            state.page = action.payload
        },
    },
    extraReducers: {
        [fetchStudySets.pending]: (state) => {
            state.loading = true
        },
        [fetchStudySets.fulfilled]: (state, action) => {
            const { studySets, maxPages } = action.payload
            state.value = studySets
            state.maxPages = maxPages
            state.loading = false
        },
        [deleteStudySet.fulfilled]: (state, action) => {
            state.value = state.value.filter(
                (studySet) => studySet._id !== action.payload
            )
        },
    },
})

export const { goToPage } = studySetsSlice.actions

export default studySetsSlice.reducer
