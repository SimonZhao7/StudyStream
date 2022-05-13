import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'
// API
import AXIOS from '../../api'
// Styles
import { MainWrapper } from '../../globalStyles'

const APICallback = () => {
    const searchParams = useSearchParams()[0]
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const handleResponse = async () => {
            const token = localStorage.getItem('jwt')
            try {
                const response = await AXIOS.post('/spotify/callback', {
                    code: searchParams.get('code'),
                    grantType: 'authorization_code',
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    localStorage.setItem('spotify', JSON.stringify(response.data))
                }
            } catch (error) { // Error from accessing this route directly
                navigate('/connect')
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
