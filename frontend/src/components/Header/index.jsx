import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../../utils/colors'
import React, { useContext } from 'react'
import { TokenContext } from '../../utils/context/index2'

const StyledLink = styled(Link)`
    padding: 15px 15px 0px 15px;
    color: #8186a0;
    text-decoration: none;
    font-size: 20px;
    ${(props) =>
        props.$isPosts &&
        `color: white;`}
    ${(props) =>
        props.$isAddPost &&
        `color: ${colors.secondary};`}
    
    @media (max-width: 750px) {
        font-size: 18px;
    }
    
    @media (max-width: 500px) {
        font-size: 14px;
    }

    @media (max-width: 400px) {
        font-size: 12px;
    }

    @media (max-width: 375px) {
        font-size: 12px;
        padding: 15px 10px 0px 10px;
    }
`
const NavBar = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
align-items: center;
`

function Header() {
    const { setToken } = useContext(TokenContext);
    const { userPseudo } = useContext(TokenContext);
    return (
        <NavBar>
            <StyledLink onClick={() => setToken('')} to="/" $isAddPost>Deconnexion {userPseudo}</StyledLink>
            <StyledLink to="/Posts" $isPosts>Posts</StyledLink>
            <StyledLink to="/AddPost" $isPosts>Partager</StyledLink>
        </NavBar>
    )
}

export default Header