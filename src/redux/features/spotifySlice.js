import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AXIOS from '../../api'

const initialState = {
    editPlaylistModalOpen: false,
    playlistSongs: [],
}

export const fetchPlaylistSongs = createAsyncThunk(
    'spotify/fetchPlaylistSongs',
    async(studySetId) => {
        const token = localStorage.getItem('jwt')
        const spotifyData = localStorage.getItem('spotify')
        const response = await AXIOS.get('/spotify/playlists', {
            params: {
                studySetId,
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

const spotifySlice = createSlice({
    name: 'spotify',
    initialState, 
    reducers: {
        openEditModal: (state) => {
            state.editPlaylistModalOpen = true
        },
        closeModals: (state) => {
            state.editPlaylistModalOpen = false
        }
    },
    extraReducers: {
        [fetchPlaylistSongs.fulfilled]: (state, action) => {
            console.log(action)
            const { spotifyData, tracks } = action.payload
            localStorage.setItem('spotify', JSON.stringify(spotifyData))
            state.playlistSongs = tracks
        }
    },
})

export const { openEditModal, closeModals } = spotifySlice.actions

export default spotifySlice.reducer