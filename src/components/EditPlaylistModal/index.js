import React, { useEffect, useRef } from 'react'
// Styles
import { EditWrapper, Songs, YourSongs } from './EditPlaylistModal.styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlaylistSongs, goToPage } from '../../redux/features/spotifySlice'
// Components
import Song from '../Song'
import PaginateNav from '../PaginateNav'

const EditPlaylistModal = () => {
    const songs = useSelector((state) => state.spotify.playlistSongs)
    const maxPages = useSelector((state) => state.spotify.maxPages)
    const { _id } = useSelector((state) => state.studySet.studySet)
    const page = useSelector((state) => state.spotify.page)
    const yourSongsTop = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPlaylistSongs({ studySetId: _id, page }))
        yourSongsTop.current.scrollIntoView(true)
    }, [_id, dispatch, page])

    return (
        <EditWrapper>
            <Songs></Songs>
            <YourSongs>
                <h2 ref={yourSongsTop}>Your Songs</h2>
                {songs.map((song, index) => (
                    <Song song={song} key={index} type='delete' />
                ))}
                <PaginateNav
                    page={page}
                    maxPages={maxPages}
                    pageChangeMethod={goToPage}
                />
            </YourSongs>
        </EditWrapper>
    )
}

export default EditPlaylistModal
