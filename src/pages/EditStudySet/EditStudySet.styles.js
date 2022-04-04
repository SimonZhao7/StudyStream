import styled from 'styled-components'
import { MainWrapper } from '../../globalStyles'

export const EditWrapper = styled(MainWrapper)`
    align-items: flex-start;
    padding: 20px;
`

export const StudySetWrapper = styled.section`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
    width: 60%;
`

export const StudySetInfo = styled.section`
    box-sizing: border-box;
    background-color: white;
    color: black;
    width: 100%;
    max-height: 300px;
    border-radius: 10px;
    padding: 20px;
`

export const ButtonsWrapper = styled.div`
    width: 20%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const TitleRow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const StatsRow = styled.div`
    display: flex;
`