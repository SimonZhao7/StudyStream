import React, { useEffect, useRef, useState } from 'react'
// Styles
import { EditWrapper, Songs, YourSongs } from './EditPlaylistModal.styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import { fetchPlaylistSongs, goToPage } from '../../redux/features/spotifySlice'
import {
    search,
    goToPage as goToResultPage,
} from '../../redux/features/spotifySearchSlice'
// Components
import Song from '../Song'
import PaginateNav from '../PaginateNav'
import Input from '../Input'

const EditPlaylistModal = () => {
    const songs = useSelector((state) => state.spotify.playlistSongs)
    const maxPages = useSelector((state) => state.spotify.maxPages)
    const { _id } = useSelector((state) => state.studySet.studySet)
    const page = useSelector((state) => state.spotify.page)
    const searchPage = useSelector((state) => state.spotifySearch.page)
    const maxSearchPages = useSelector((state) => state.spotifySearch.maxPages)
    const trackResults = useSelector(
        (state) => state.spotifySearch.trackResults
    )
    const [searchTerm, setSearchTerm] = useState('')
    const yourSongsTop = useRef()
    const searchResultsTop = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPlaylistSongs({ studySetId: _id, page }))
        yourSongsTop.current.scrollIntoView(true)
    }, [_id, dispatch, page])

    useEffect(() => {
        dispatch(search({
            searchTerm,
            page: searchPage,
        }))
        searchResultsTop.current.scrollIntoView(true)
    }, [dispatch, searchPage, searchTerm])

    return (
        <EditWrapper>
            <Songs>
                <h2 ref={searchResultsTop}>Add Songs</h2>
                <Input
                    placeHolder='Search For A Song...'
                    onChange={e => setSearchTerm(e.target.value)}
                />
                {trackResults.map((track, index) => (
                    <Song song={track} key={index} />
                ))}
                <PaginateNav
                    page={searchPage}
                    maxPages={maxSearchPages}
                    pageChangeMethod={goToResultPage}
                />
            </Songs>
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
