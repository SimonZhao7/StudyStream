import React, { useEffect, useRef, useState } from 'react'
// Styles
import { EditWrapper, Songs, YourSongs } from './EditPlaylistModal.styles'
// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
    fetchPlaylistSongs,
    fetchRecommendations,
    goToPage,
} from '../../redux/features/spotifySlice'
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
    const recommendations = useSelector(
        (state) => state.spotify.recommendations
    )
    const loading = useSelector((state) => state.spotifySearch.loading)
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
        setTimeout(() => {
            dispatch(fetchPlaylistSongs({ studySetId: _id, page }))
            yourSongsTop.current.scrollIntoView(true)
        }, 1000)
        return () => clearTimeout()
    }, [_id, dispatch, page])

    useEffect(() => {
        if (searchTerm) {
            dispatch(
                search({
                    searchTerm,
                    page: searchPage,
                })
            )
        }
        searchResultsTop.current.scrollIntoView(true)
    }, [dispatch, searchPage, searchTerm])

    useEffect(() => {
        dispatch(
            fetchRecommendations(
                songs
                    .slice(-5)
                    .map((song) => song.id)
                    .join(',')
            )
        )
    }, [dispatch, songs])

    return (
        <EditWrapper>
            <Songs>
                <h2 ref={searchResultsTop}>Add Songs</h2>
                <Input
                    attrs={{
                        placeHolder: 'Search For A Song...',
                        onChange: (e) => setSearchTerm(e.target.value),
                    }}
                />
                {!loading &&
                    (searchTerm ? (
                        trackResults.length > 0 ? (
                            <>
                                <h3>Results</h3>
                                {trackResults.map((track, index) => (
                                    <Song song={track} key={index} />
                                ))}
                                <PaginateNav
                                    page={searchPage}
                                    maxPages={maxSearchPages}
                                    pageChangeMethod={goToResultPage}
                                />
                            </>
                        ) : (
                            <p>No Results...</p>
                        )
                    ) : recommendations.length > 0 ? (
                        <>
                            <h3>Recommendations</h3>
                            {recommendations.map((recommendation, index) => (
                                <Song song={recommendation} key={index} />
                            ))}
                        </>
                    ) : (
                        <p style={{ textAlign: 'center' }}>
                            No Recommendations... Add Some Songs!
                        </p>
                    ))}
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
