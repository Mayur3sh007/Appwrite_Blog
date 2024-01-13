import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'     //which means our login function will be called as authLogin here
import {Button, Input, Logo} from "./index"
import {useDispatch} from "react-redux"
import authService from "../appwrite/auth"
import {useForm} from "react-hook-form"                     //* Read documentation of react-hook-form */

function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {      //Method for handleSubmit on Submiting form && we use this so that we dont have to create States in input when we pass data

        setError("")        //always set errors as empty while creating login/register forms

        try {
            const session = await authService.login(data)   //send the data to create a session through our login function

            if (session)    //if session exists then  
            {
                const userData = await authService.getCurrentUser();

                if(userData) dispatch(authLogin(userData));  //so that store knows 

                navigate("/")   //now user has logged in so send him to home
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>

                            {/* Logo */}
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>

                                {/* Directing user to signup page */}
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>

        {error && <p className="text-red-600 mt-8 text-center">{error}</p>} {/* If error exists then show it */}

                    {/* Actions on Submit */}
        <form onSubmit={handleSubmit(login)} className='mt-8'>  {/* Handle submit is a method we got from useForm() in which we have to pass our own created method  */}
            <div className='space-y-5'>

                <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {         // this ...register syntax is a MUST for using useForm's register(just a keyword). Here after spreading the first thing we give it is a UNIQUE name coz our "data" param passed in login fucn will be passed under these unique names. register stores data and sends it to handle submmit
                    required: true,
                    validate: {                 //this is a like a perk we use for validation   read this from documentation of useForm
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />

                <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {          
                    required: true,
                })}
                />

                <Button
                type="submit"
                className="w-full"
                >
                    Sign in
                </Button>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login