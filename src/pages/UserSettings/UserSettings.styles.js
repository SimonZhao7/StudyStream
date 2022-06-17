import styled from 'styled-components'

export const FormWrapper = styled.form`
    width: 550px;
    background-color: white;
    color: var(--dark-gray);
    padding: 60px 30px;
    border-radius: 3px;
    position: relative;

    legend {
        margin-bottom: 40px;
    }

    svg {
        position: absolute;
        top: 5px;
        left: 5px;
    }
`

export const IconWrapper = styled.div`
    position: absolute;
`

export const SettingsMenu = styled.aside`
    width: 150px;
    background-color: white;
    position: absolute;
    left: -200px;

    border-radius: 3px;

    div:first-child {
        button {
            border-radius: 3px 3px 0 0;
        }
    }

    div:last-child {
        button {
            border-radius: 0 0 3px 3px;
        }
    }
`

export const FileInput = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;

    label {
        white-space: nowrap;
    }
    margin-bottom: 20px;
`