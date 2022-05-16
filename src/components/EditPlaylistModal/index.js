import React, { useEffect } from 'react'
// Styles
import { EditWrapper, Songs, YourSongs } from './EditPlaylistModal.styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlaylistSongs } from '../../redux/features/spotifySlice'
// Components
import Song from '../Song'

const EditPlaylistModal = () => {
    const songs = useSelector((state) => state.spotify.playlistSongs)
    const { _id } = useSelector((state) => state.studySet.studySet)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPlaylistSongs(_id)) 
    }, [_id, dispatch])

    return (
        <EditWrapper>
            <Songs></Songs>
            <YourSongs>
                <h2>Your Songs</h2>
                {songs.map((song, index) => (
                    <Song song={song} key={index} type='delete' />
                ))}
            </YourSongs>
        </EditWrapper>
    )
}

export default EditPlaylistModal
