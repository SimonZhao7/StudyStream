import React from 'react'
// Styles
import { SongWrapper, SongData, ButtonWrapper, Button } from './Song.styles'
// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
    removeFromPlaylist,
    addToPlaylist,
} from '../../redux/features/spotifySlice'
// Icons
import { AiFillDelete } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'

const Song = ({ song, type }) => {
    const { artists, name, uri } = song
    const { _id: studySetId } = useSelector((state) => state.studySet.studySet)
    const dispatch = useDispatch()

    return (
        <SongWrapper>
            <SongData>
                <h3>{name}</h3>
                <p>
                    By:{' '}
                    {artists
                        .reduce(
                            (prevValue, currentValue) =>
                                (prevValue += `${currentValue.name}, `),
                            ''
                        )
                        .slice(0, -2)}
                </p>
            </SongData>
            <ButtonWrapper>
                {type === 'delete' ? (
                    <Button
                        type={type}
                        onClick={() =>
                            dispatch(
                                removeFromPlaylist({
                                    track: { uri },
                                    studySetId,
                                })
                            )
                        }
                    >
                        <AiFillDelete color='white' size={25} />
                    </Button>
                ) : (
                    <Button
                        type={type}
                        onClick={() =>
                            dispatch(
                                addToPlaylist({ 
                                    uri, 
                                    studySetId 
                                })
                            )
                        }
                    >
                        <IoMdAdd color='white' size={25} />
                    </Button>
                )}
            </ButtonWrapper>
        </SongWrapper>
    )
}

export default Song
