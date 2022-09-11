import React, {createContext} from "react";
import { useState } from "react";

const UserContext = createContext(); 

export function UserProvider({children}){
    const [authenticated, setAuthenticated] = useState(true);

    return (
    <UserContext.Provider value={{authenticated, setAuthenticated}}>{children}</UserContext.Provider>
    );
}

export default UserContext;