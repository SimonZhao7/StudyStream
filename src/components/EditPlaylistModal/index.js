import React, { useEffect, useRef, useState } from 'react'
// Styles
import { EditWrapper, ContentHalf, NotifText } from './EditPlaylistModal.styles'
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
import Spinner from '../Spinner'

const EditPlaylistModal = () => {
    const songs = useSelector((state) => state.spotify.playlistSongs)
    const recommendations = useSelector(
        (state) => state.spotify.recommendations
    )
    const searchLoading = useSelector((state) => state.spotifySearch.loading)
    const getLoading = useSelector((state) => state.spotify.getLoading)
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
            const timer = setTimeout(() => {
                dispatch(
                    search({
                        searchTerm,
                        page: searchPage,
                    })
                )
            }, 500)
            searchResultsTop.current.scrollIntoView(true)
            return () => clearTimeout(timer)
        }
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
            <ContentHalf>
                <h2 ref={searchResultsTop}>Add Songs</h2>
                <Input
                    attrs={{
                        placeHolder: 'Search For A Song...',
                        onChange: (e) => setSearchTerm(e.target.value),
                    }}
                />
                {!searchLoading ? (
                    searchTerm ? (
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
                            <NotifText>No Results...</NotifText>
                        )
                    ) : recommendations.length > 0 ? (
                        <>
                            <h3>Recommendations</h3>
                            {recommendations.map((recommendation, index) => (
                                <Song song={recommendation} key={index} />
                            ))}
                        </>
                    ) : (
                        <NotifText>
                            No Recommendations... Add Some Songs!
                        </NotifText>
                    )
                ) : (
                    <Spinner height={'50px'} width={'6px'} />
                )}
            </ContentHalf>
            <ContentHalf>
                <h2 ref={yourSongsTop}>Your Songs</h2>
                {!getLoading ? (
                    songs.length > 0 ? (
                        <>
                            {songs.map((song, index) => (
                                <Song song={song} key={index} type='delete' />
                            ))}
                            <PaginateNav
                                page={page}
                                maxPages={maxPages}
                                pageChangeMethod={goToPage}
                            />
                        </>
                    ) : (
                        <NotifText>
                            You don't have any songs in this playlist!
                        </NotifText>
                    )
                ) : (
                    <>
                        <Spinner height={'50px'} width={'6px'} />
                        <br />
                    </>
                )}
            </ContentHalf>
        </EditWrapper>
    )
}

export default EditPlaylistModal
