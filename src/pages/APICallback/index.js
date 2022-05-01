import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Buffer } from 'buffer'
// API
import axios from 'axios'
// Styles
import { MainWrapper } from '../../globalStyles'

const APICallback = () => {
    const searchParams = useSearchParams()[0]
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
                    const { access_token, refresh_token, expires_in } =
                        response.data
                    localStorage.setItem(
                        'spotify',
                        JSON.stringify({
                            refresh_token,
                            access_token,
                            expires_in_ms: expires_in * 1000,
                            dateAccessed: new Date(),
                        })
                    )
                }
            } catch (error) {
                console.log(error.response)
            }
        }
        handleResponse()
    }, [searchParams])

    return (
        <MainWrapper>
            <h1>You have successfully connected to your Spotify Account</h1>
        </MainWrapper>
    )
}

export default APICallback
