import React from 'react'
import Button from '../../components/Button'
import { MainWrapper } from '../../globalStyles'

const APIConnect = () => {
    return (
        <MainWrapper>
            <a href={`https://accounts.spotify.com/authorize?${
                new URLSearchParams({
                    response_type: 'code',
                    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
                    scope: 'playlist-modify-public',
                    redirect_uri: 'http://127.0.0.1:3000/api/callback',
                    show_dialog: true,
                })
            }`}
            ><Button label='Connect to Spotify' style={{ width: '300px'}}/></a>
        </MainWrapper> 
    )
}

export default APIConnect