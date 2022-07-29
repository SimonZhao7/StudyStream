import React from 'react'
// Styles
import { Center, SpinnerWrapper } from './Spinner.styles'

const Spinner = ({ width, height }) => (
    <Center>
        <SpinnerWrapper height={height} width={width} />
    </Center>
)

export default Spinner
