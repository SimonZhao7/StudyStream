import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AXIOS from '../../api'

const initialState = {
    editPlaylistModalOpen: false,
    playlistSongs: [],
}

export const fetchPlaylistSongs = createAsyncThunk(
    'spotify/fetchPlaylistSongs',
    async (studySetId) => {
        const token = localStorage.getItem('jwt')
        const spotifyData = localStorage.getItem('spotify')
        const response = await AXIOS.get('/spotify/playlists', {
            params: {
                studySetId,
                spotifyData,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.status === 200) {
            return response.data
        }
    }
)

export const removeFromPlaylist = createAsyncThunk(
    'spotify/removeFromPlaylist',
    async (body) => {
        const token = localStorage.getItem('jwt')
        const spotifyData = JSON.parse(localStorage.getItem('spotify'))

        const response = await AXIOS.delete(`/spotify/playlists`, {
            data: {
                ...body,
                spotifyData,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
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
        },
    },
    extraReducers: {
        [fetchPlaylistSongs.fulfilled]: (state, action) => {
            const { spotifyData, tracks } = action.payload
            localStorage.setItem('spotify', JSON.stringify(spotifyData))
            state.playlistSongs = tracks
            state.isFetchSuccessful = true
        },
        [fetchPlaylistSongs.rejected]: () => {
            window.location.href = '/connect'
        },
        [removeFromPlaylist.fulfilled]: (state, action) => {
            const { tracks, spotifyData } = action.payload

            localStorage.setItem('spotify', JSON.stringify(spotifyData))
            const filtered = state.playlistSongs.filter(
                (song) =>
                    !tracks
                        .map((track) => track.uri)
                        .includes(song.track.uri)
            )
            state.playlistSongs = filtered
        },
    },
})

export const { openEditModal, closeModals } = spotifySlice.actions

export default spotifySlice.reducer