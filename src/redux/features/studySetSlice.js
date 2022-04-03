import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
    studySet: {},
}

const studySetSlice = createSlice({
    name: 'studySet',
    initialState,
    reducers: {
        
    },
    extraReducers: {
        [fetchStudySet.pending]: (state) => {
            state.loading = true
        },
        [fetchStudySet.fulfilled]: (state, action) => {
            state.studySet = action.payload
            state.loading = false
        },
        [fetchStudySet.rejected]: (state) => {
            state.loading = false
        },
    }
})

export default studySetSlice.reducer