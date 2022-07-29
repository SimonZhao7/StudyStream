import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        --primary-color:  #3F3F93;
        --secondary-color: #3131A5;
        --primary-color-hover: #137CA9;
        --secondary-color-hover: #21216E;
        --dark-gray: #252525;
        --error-color: #DC1818;
        --error-color-hover: #9F1212;
        --success-color: #5cb85c;
    }

    html, body, #root {
        margin: 0;
        padding: 0;
        color: white;
        background-color: var(--primary-color);
        height: 100%;
    }

    input {
        :focus {
            outline: none;
        }
    }

    legend {
        font-size: 26px;
        text-align: center;
        margin-bottom: 15px;
    }

    a {
        text-decoration: none;
    }
`

export const BaseWrapper = styled.main`
    width: 100%;
    height: 100%;
    padding: 70px 20px 20px 20px;
`

export const MainWrapper = styled(BaseWrapper)`
    display: flex;
    justify-content: center;
    align-items: center;

    overflow-y: scroll;
`

export default GlobalStyle