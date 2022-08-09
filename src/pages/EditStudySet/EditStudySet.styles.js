import styled from 'styled-components'
import { MainWrapper } from '../../globalStyles'

export const EditWrapper = styled(MainWrapper)`
    align-items: flex-start;
`

export const StudySetWrapper = styled.section`
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    gap: 15px;
    width: 60%;

    @media screen and (max-width: 992px) {
        width: 85%;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export const StudySetInfo = styled.section`
    background-color: white;
    color: var(--dark-gray);
    width: 100%;
    max-height: 300px;
    border-radius: 5px;
    padding: 20px;

    @media screen and (max-width: 576px) {
        padding: 15px;
    }
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

export const FlashcardsWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 15px;
`

export const LineBreak = styled.hr`
    width: 100%;
    border: 3px solid var(--secondary-color);
    border-radius: 1px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
`