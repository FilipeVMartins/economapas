import React, { useState, useEffect, createContext } from 'react';

export const PageContext = createContext();

const PageContextProvider = (props) => {

    const [user, setUser] = useState(null);
    const [access_token, setAccess_token] = useState(null);
    const [csrf_token, setCsrf_token] = useState(null);

    //on mount
    useEffect(() => {
        setCsrf_token(document.querySelector('meta[name="csrf-token"]').content);
    }, []);

    return (
        <PageContext.Provider value={{
            user: user,
            access_token: access_token,
            csrf_token: csrf_token,
            setAccess_token: setAccess_token,
            setUser: setUser,
        }}>
        	{props.children}
        </PageContext.Provider>
    );
}
export default PageContextProvider;