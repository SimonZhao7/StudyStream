import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AXIOS from '../../api'

const initialState = {
    trackResults: [],
    page: 1,
    maxPages: 1,
    loading: false,
}

export const search = createAsyncThunk(
    'spoitfySearch/serach',
    async (body) => {
        const token = localStorage.getItem('jwt')
        const spotifyData = JSON.parse(localStorage.getItem('spotify'))
        const response = await AXIOS.get('/spotify/playlists', {
            params: {
                ...body,
                spotifyData,
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (response.status === 200) {
            return response.data
        }
    }
)

const spotifySearchSlice = createSlice({
    name: 'spotifySearch',
    initialState,
    reducers: {
        goToPage: (state, action) => {
            state.page = action.payload
        }
    },
    extraReducers: {
        [search.pending]: (state) => {
            state.loading = true
        },
        [search.fulfilled]: (state, action) => {
            const { spotifyData, results, maxPages } = action.payload
            localStorage.setItem('spotify', JSON.stringify(spotifyData))
            state.trackResults = results.items
            state.maxPages = maxPages > 50 ? 50 : maxPages // Spotify only allows 1000 max offset
            state.loading = false
        }
    },
})

export const { goToPage } = spotifySearchSlice.actions

export default spotifySearchSlice.reducer