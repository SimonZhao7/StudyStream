import { createGlobalStyle } from "styled-components";
import styled from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        --primary-color: #1690c4;
        --secondary-color: #1dc6cc;
        --primary-color-hover: #137CA9;
        --secondary-color-hover: #18b0b5;
        --dark-gray: #292b2c;
        --error-color: #f20000;
        --error-color-hover: #d40000;
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