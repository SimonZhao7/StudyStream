import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
import { Buffer } from 'buffer'
// API
import axios from 'axios'
import AXIOS from '../../api/api'
// Styles
import { MainWrapper } from '../../globalStyles'
import S_AXIOS from '../../api/spotifyApi'

const APICallback = () => {
    const searchParams = useSearchParams()[0]
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResponse = async () => {
            const params = new URLSearchParams()
            params.append('code', searchParams.get('code'))
            params.append('redirect_uri', 'http://127.0.0.1:3000/api/callback')
            params.append('grant_type', 'authorization_code')

            try {
                const response = await axios.post(
                    'https://accounts.spotify.com/api/token',
                    params,
                    {
                        headers: {
                            Authorization: `Basic ${Buffer.from(
                                process.env.REACT_APP_SPOTIFY_CLIENT_ID +
                                    ':' +
                                    process.env.REACT_APP_SPOTIFY_CLIENT_SECRET
                            ).toString('base64')}`,
                        },
                    }
                )
                if (response.status === 200) {
                    const { access_token, refresh_token, expires_in } = response.data
                    const token = localStorage.getItem('jwt')

                    // Because of asyncThunk delay, we have to make this API call in the useEffect or _id would be undefined
                    const _id = (await AXIOS.get('/users/current', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })).data._id

                    await AXIOS.patch(`/users/${_id}`, { spotifyRefreshToken: refresh_token }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })

                    const spotifyId = (await S_AXIOS.get('/me', {
                        headers: {
                            Authorization: `Bearer ${access_token}`
                        }
                    })).data.id
                    
                    localStorage.setItem(
                        'spotify',
                        JSON.stringify({
                            refresh_token,
                            access_token,
                            spotifyId,
                            expires_in_ms: expires_in * 1000,
                            dateAccessed: new Date(),
                        })
                    )
                }
            } catch (error) { // Error from accessing this route directly
                // navigate('/connect')
                console.log(error)
            }
        }
        setLoading(true)
        handleResponse()
        setLoading(false)
    }, [searchParams, navigate])

    return (
        <MainWrapper>
            {!loading &&
                <h1>You have successfully connected to your Spotify Account</h1>
            }
        </MainWrapper>
    )
}

export default APICallback
