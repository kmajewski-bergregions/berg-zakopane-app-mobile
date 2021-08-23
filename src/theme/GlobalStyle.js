import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

*,
*::before,
*::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
}

html {
    font-size: 62.5%;
    scroll-behavior: smooth;

    ::-webkit-scrollbar {
      display: none;
    }
}

body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    line-height: 26px;
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    color: #323232;
    background-color: #FFFFFF;
}

button {
    outline: none;

    :focus {
        border: none;
    }
}
`;

export default GlobalStyle;
