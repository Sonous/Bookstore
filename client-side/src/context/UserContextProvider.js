import { createContext, useState } from 'react';

const UserContext = createContext();
const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };
    return <UserContext.Provider value={{ user, setUser, logout }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
