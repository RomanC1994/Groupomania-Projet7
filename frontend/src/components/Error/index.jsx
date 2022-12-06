import styled from 'styled-components'

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

function Error() {
    return (
        <ErrorContainer>   
            <h1>Url incorrect, cette page n'existe pas.</h1>   
        </ErrorContainer>
    )
}
 
export default Error