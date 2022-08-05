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

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async ({ id, body }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('jwt')
            const response = await AXIOS.patch(`/users/${id}`, body, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

const initialState = {
    loading: true,
    signedIn: false,
    errors: [],
    success: false,
    processing: false,
    value: {},
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.signedIn = false
            state.value = {}
        },
        resetFormSettings: (state) => {
            state.success = false
            state.errors = []
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
        },
        [updateUser.pending]: (state) => {
            state.processing = true
        },
        [updateUser.fulfilled]: (state, action) => {
            const { result, updatedUser } = action.payload
            if (result.modifiedCount > 0) {
                state.errors = []
                state.success = true
            } else {
                state.errors = [{ message: 'Fields may not be left empty' }]
            }
            state.processing = false
            state.value.userImage = updatedUser.userImage
        },
        [updateUser.rejected]: (state, action) => {
            state.success = false
            state.errors = action.payload
            state.processing = false
        }
    }
})

export const { logout, resetFormSettings } = userSlice.actions
export default userSlice.reducer
