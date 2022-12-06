/* import styled from 'styled-components'
import colors from '../../utils/colors'

const FooterBackground = styled.div`
    background-color : ${colors.backgroundLight}; 
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
	height: 150px;
`
const FooterLinks = styled.div `
    margin-left: 3%;
`

const FooterA = styled.a `
    color: white;
    text-decoration: none;
`

function Footer() {
	return (
		<FooterBackground>
            <FooterLinks>
                <FooterA href="#"><p>Groupomania (Site Officiel)</p></FooterA>
                <FooterA href="#"><p>MonAgenceWeb</p></FooterA>
                <FooterA href="#"><p>Mentions légales</p></FooterA>
                <FooterA href="#"><p>Contact</p></FooterA>
            </FooterLinks>
		</FooterBackground>
	)
}

export default Footer */

import styled from 'styled-components'
import colors from '../../utils/colors'
import { useContext } from 'react'
import { ThemeContext } from '../../utils/context/index'
 
const FooterContainer = styled.footer`
    background-color: ${colors.backgroundLight};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding-top: 60px;
`
 
const NightModeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    color: ${colors.secondary};
    margin-bottom: 20px;
`
 
function Footer() {
    const { toggleTheme, theme } = useContext(ThemeContext)
    return (
        <FooterContainer>
        <NightModeButton onClick={() => toggleTheme()}>
            Changer de mode : {theme === 'light' ? '☀️' : '🌙'}
        </NightModeButton>
        </FooterContainer>
    )
}
 
export default Footer