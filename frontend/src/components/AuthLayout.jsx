import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {
    const navigate  = useNavigate()
    const [loader, setloader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)
    // const authStatus = true
    
  

    useEffect(()=>{
        // if (user === null ) authStatus == false
        //If authentication is true and authStatus is not equal to true, it means the user is not authenticated. So, it redirects to the login page (navigate("/login")).
        // If authentication is false and authStatus is not equal to false, it means the user is authenticated. So, it redirects to the home page (navigate("/")).
        // setloader(false) is called in both cases, indicating that loading is complete.
        // Finally, the component returns either a loading message or the children based on the value of the loader state.
        if(authentication && authStatus != authentication) navigate('/login')

        else if(!authentication && authStatus != authentication) navigate('/')
        setloader(false)


    }, [])


  return (
    loader?<h1>Loading...</h1>:<>{children}</>
  )
}

