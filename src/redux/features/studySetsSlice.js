import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// API
import AXIOS from '../../api'

export const fetchStudySets = createAsyncThunk(
    'studySets/fetchStudySets',
    async (queryString) => {
        const token = localStorage.getItem('jwt')
        const response = await AXIOS.get(`/studysets?${queryString}`, {
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
    value: [],
}

const studySetsSlice = createSlice({
    name: 'studySets',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchStudySets.pending]: (state) => {
            state.loading = true
        },
        [fetchStudySets.fulfilled]: (state, action) => {
            state.value = action.payload
            state.loading = false
        },
    },
})

export default studySetsSlice.reducer
