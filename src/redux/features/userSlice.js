import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AXIOS from "../../api";

export const login = createAsyncThunk(
    'user/getLoggedInUser',
    async (token) => {
        const response = await AXIOS.get('/users/current', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    }
)

const initialState = {
    loading: true,
    signedIn: false,
    value: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.signedIn = false
            state.value = {}
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.loading = true // extra insurance
        },
        [login.fulfilled]: (state, action) => {
            state.value = action.payload
            state.signedIn = true
            state.loading = false
        },
        [login.rejected]: (state) => {
            state.loading = false
        }
    }
})

export const { logout } = userSlice.actions
export default userSlice.reducer
