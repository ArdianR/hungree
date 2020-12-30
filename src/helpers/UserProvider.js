import React, { Component, createContext, useEffect, useState } from "react";
import { auth, generateUserDocument } from "../services/firebase";

export const UserContext = createContext({ user: null });

const UserProvider = (props) => {
    const [user, setUser] = useState(false);
    useEffect(() => {
        auth().onAuthStateChanged(userAuth => {
            console.log(userAuth);
        });
    }, []);

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}

export default UserProvider;