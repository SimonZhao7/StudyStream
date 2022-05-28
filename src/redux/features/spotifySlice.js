import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import AXIOS from '../../api'

const initialState = {
    editPlaylistModalOpen: false,
    playlistSongs: [],
    recommendations: [],
    maxPages: 1,
    page: 1,
}

export const fetchPlaylistSongs = createAsyncThunk(
    'spotify/fetchPlaylistSongs',
    async (body) => {
        const { studySetId, page } = body
        const token = localStorage.getItem('jwt')
        const spotifyData = JSON.parse(localStorage.getItem('spotify'))
        const response = await AXIOS.get(`/spotify/playlists/${studySetId}`, {
            params: {
                spotifyData,
                page,
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
        const { studySetId, track } = body
        const token = localStorage.getItem('jwt')
        const spotifyData = JSON.parse(localStorage.getItem('spotify'))

        const response = await AXIOS.delete(
            `/spotify/playlists/${studySetId}`,
            {
                data: {
                    track,
                    spotifyData,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        if (response.status === 200) {
            return response.data
        }
    }
)

export const addToPlaylist = createAsyncThunk(
    'spotify/addToPlaylist',
    async (body) => {
        const { uri, studySetId } = body
        const token = localStorage.getItem('jwt')
        const spotifyData = JSON.parse(localStorage.getItem('spotify'))

        const response = await AXIOS.post(
            `/spotify/playlists/${studySetId}`,
            { uri, spotifyData },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )

        if (response.status === 201) {
            return response.data
        }
    }
)

export const fetchRecommendations = createAsyncThunk(
    'spotify/fetchRecommendations', 
    async(tracks) => {
        const token = localStorage.getItem('jwt')
        const spotifyData = JSON.parse(localStorage.getItem('spotify'))

        if (tracks) {
            const response = await AXIOS.get('/spotify/tracks', {
                params: {
                    tracks,
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
        goToPage: (state, action) => {
            state.page = action.payload
        },
    },
    extraReducers: {
        [fetchPlaylistSongs.fulfilled]: (state, action) => {
            const { spotifyData, tracks, maxPages } = action.payload
            localStorage.setItem('spotify', JSON.stringify(spotifyData))
            state.playlistSongs = tracks.map((track) => track.track)
            state.isFetchSuccessful = true
            state.maxPages = maxPages
        },
        [fetchPlaylistSongs.rejected]: () => {
            window.location.href = '/connect'
        },
        [removeFromPlaylist.fulfilled]: (state, action) => {
            const { track, spotifyData } = action.payload
            localStorage.setItem('spotify', JSON.stringify(spotifyData))
            const filtered = state.playlistSongs.filter(
                (song) => track.uri !== song.uri
            )
            state.playlistSongs = filtered
        },
        [addToPlaylist.fulfilled]: (state, action) => {
            const { addedTrack, spotifyData } = action.payload
            localStorage.setItem('spotify', JSON.stringify(spotifyData))
            state.playlistSongs.push(addedTrack)
        },
        [fetchRecommendations.fulfilled]: (state, action) => {
            const { spotifyData, results } = action.payload
            localStorage.setItem('spotify', JSON.stringify(spotifyData))
            state.recommendations = results
        }
    },
})

export const { openEditModal, closeModals, goToPage } = spotifySlice.actions

export default spotifySlice.reducer