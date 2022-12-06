import { createGlobalStyle } from 'styled-components'
import colors from '../colors'

const StyledGlobalStyle = createGlobalStyle`

    * {
        font-family: 'Lato', Helvetica, sans-serif;
    }
    body {
        padding: -10px;
        min-width: 300px;
    }
    div, button, a {
        background-color: ${({ isDarkMode }) => (isDarkMode ? colors.backgroundLight : colors.primary)}; 
    }
    p {
        text-align: center;
    }
    h1 {
        color: white;
    }
`

export default StyledGlobalStyle