import { useContext } from 'react'
import { ThemeContext } from '../context/index'
import StyledGlobalStyle from './index.jsx'

function GlobalStyle() {
    const { theme } = useContext(ThemeContext)

    return <StyledGlobalStyle isDarkMode={theme === 'dark'} />

}


export default GlobalStyle