import styled from 'styled-components'
import colors from '../../utils/colors'
import { useContext } from 'react'
import { ThemeContext } from '../../utils/context/index'
 
const FooterContainer = styled.footer`
    background-color: ${colors.backgroundLight};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
`
 
const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.secondary};
    margin: 20px 0px 20px 20px;
`

const FooterLinks = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${colors.backgroundLight};
    margin-left: 3%;
`

const FooterA = styled.a `
    background-color: ${colors.backgroundLight};
    color: ${colors.secondary};
    text-decoration: none;
`

function Footer() {
    const { toggleTheme, theme } = useContext(ThemeContext)
    return (
        <FooterContainer>
             <FooterLinks>
                <FooterA href="#"><p>Groupomania (Site Officiel)</p></FooterA>
                <FooterA href="#"><p>MonAgenceWeb</p></FooterA>
                <FooterA href="#"><p>Mentions légales</p></FooterA>
                <FooterA href="#"><p>Contact</p></FooterA>
                <NightModeButton onClick={() => toggleTheme()}>
                    Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
                </NightModeButton>
            </FooterLinks>
        </FooterContainer>
    )
}
 
export default Footer
