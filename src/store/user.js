import React, { createContext } from 'react'

const UserContext = createContext();

const UserStore = (props) => {



    return <UserContext.Provider >{props.children}</UserContext.Provider>
}

export default UserStore