import axios from 'axios'
import { Buffer } from 'buffer'

export const refreshToken = async () => {
    const spotify = JSON.parse(
        localStorage.getItem('spotify')
    )
    const { expires_in_ms, dateAccessed, refreshToken } = spotify
    if (new Date() - expires_in_ms < new Date(dateAccessed)) {
        const body = new URLSearchParams()
        body.append('grant_type', 'refresh_token')
        body.append('refreshToken', refreshToken)

        try {
            const response = await axios.post(
                'https://accounts.spotify.com/api/token',
                body,
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
                localStorage.setItem('spotify', JSON.stringify({...spotify, access_token: response.data.access_token}))
            }  
        } catch (error) {
            console.log(error)
        }
    }
}