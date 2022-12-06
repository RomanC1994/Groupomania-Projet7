import { createContext, useState } from "react";

export const TokenContext = createContext()

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [userPseudo, setUserPseudo] = useState();
 
    return (
        <TokenContext.Provider value={{ token, setToken, userId, setUserId, userPseudo, setUserPseudo }}>
            {children}
        </TokenContext.Provider>
    )
}

export default TokenProvider

