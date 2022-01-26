import React, {createContext, useEffect, useState} from 'react';
import {userType} from "../UserList/UserList";
import {postType} from "../PostsList/PostsList";

// @ts-ignore
export const GlobalStateContext = createContext();

export const GlobalState: React.FC = ({children}) => {

    const [selectUser, setSelectUser] = useState<userType | null>(null)
    const [selectPost, setSelectPost] = useState<postType | null>(null)

    useEffect(() => {
        if (localStorage.getItem("user")) {
            // @ts-ignore
            setSelectUser(JSON.parse(localStorage.getItem("user")))
        }

        if (localStorage.getItem("post")) {
            // @ts-ignore
            setSelectPost(JSON.parse(localStorage.getItem("post")))
        }
    }, [])

    return (
        <GlobalStateContext.Provider value={{selectUser, setSelectUser, selectPost, setSelectPost}}>
            {children}
        </GlobalStateContext.Provider>
    )
}