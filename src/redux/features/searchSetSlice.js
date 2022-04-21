import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
// API
import AXIOS from "../../api"

export const fetchSearchSet = createAsyncThunk(
    'searchSet/fetchSearchSet',
    async (query) => {
        const token = localStorage.getItem('jwt')
        const response = await AXIOS.get(`/studysets?${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        if (response.status === 200) {
            console.log(response.data)
            return response.data
        }
    }
)

const initialState = {
    value: [],
    loading: false,
    page: 1,
    maxPages: 0,
}

const searchSetSlice = createSlice({
    name: 'searchSet',
    initialState,
    reducer: {
        goToPage: (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: {
        [fetchSearchSet.pending]: (state) => {
            state.loading = true
        },
        [fetchSearchSet.fulfilled]: (state, action) => {
            const { studySets, maxPages } = action.payload
            state.value = studySets
            state.maxPages = maxPages 
        }
    }
})

export const { goToPage } = searchSetSlice.actions

export default searchSetSlice.reducer