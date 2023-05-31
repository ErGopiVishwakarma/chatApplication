import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate} from 'react-router-dom'

export const ChatProvider = createContext()


const ContextProvider = ({children}) => {
    let [user,setUser] = useState()
    let [chats,setChats] =useState([])
    let [selectChat,setSelectChat] = useState()
    const navigate = useNavigate()
    
    useEffect(()=>{
        const userdata =JSON.parse(localStorage.getItem('userInfo')) || {}

        setUser(userdata)
        if(!userdata){
            navigate('/')
        }
    },[])
  return (
    <ChatProvider.Provider value={{user,setUser,selectChat,setSelectChat,chats,setChats}}>
          {children}
    </ChatProvider.Provider>
  )
}

export default ContextProvider