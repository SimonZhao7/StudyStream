import styled from 'styled-components'

export const SongWrapper = styled.section`
    background-color: var(--primary-color);
    width: 100%;
    border-radius: 5px;
    color: white;
    padding: 10px;
    margin-bottom: 10px;
    display: flex;
    gap: 8px;

    p {
        margin: 0;
    }
`

export const SongData = styled.section`
    flex: 6;
`

export const ButtonWrapper = styled.section`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Button = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.type === 'delete' ? 'var(--error-color)' : '#31bd36'};
    border: none;
    transition: background-color 0.2s ease;

    display: flex;
    justify-content: center;
    align-items: center;

    :hover {
        background-color: ${props => props.type === 'delete' ? 'var(--error-color-hover)' : '#2bad30'};
    }
`