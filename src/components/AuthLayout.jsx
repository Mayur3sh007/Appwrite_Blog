import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication = true}) {       //see use of protected when we use Router

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.Status)  //we ask the authSlice in store about the status

    useEffect(()=>{
        
        if(authentication && authentication !== authStatus)
        {
            navigate('/login');
        }
        else if(!authentication && authentication !== authStatus)
        {
            navigate('/')   //This remians on same page we are transferred to
        }
        
        setLoader(false);

    }, [authentication, authStatus, navigate])

  return loader ? <h1>Loading...</h1> : <>{children}</>

}
