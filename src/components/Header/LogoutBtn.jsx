import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {

    const dispatch = useDispatch();

    const logoutHandler = () => {
        authService.logout()        //Most of the things in appwrite are promisies ---> This logout button is from appWrite

        .then(() => {
            dispatch(logout())      //This logout function is a reducer and we dispatch it so this info is updated  in store
        })
    }

    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logoutHandler}
        >
            Logout
        </button>
      )
}

export default LogoutBtn