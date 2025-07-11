import React, { useRef } from 'react'

import "./Login.css"

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import axios from 'axios'

import LogoutIcon from '@mui/icons-material/Logout';

import CloseIcon from '@mui/icons-material/Close';

const loginSuccessful = () => {
    toast.success("Login Successful!");
}

const loginNotSuccessful = () => {
    toast.error("Login not successful, please try again!");
}

const Login = ({ setShowLogin, setCurrentUser }) => {

    const nameRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newUser = {
            userName: nameRef.current.value,
            password: passRef.current.value
        }
        try {

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, newUser);

            console.log(res);

            loginSuccessful();

            const userData = JSON.parse(res.config.data);

            setCurrentUser(userData.userName)

            setShowLogin(false);

        } catch (err) {
            loginNotSuccessful();
            console.log(err);
        }
    }

    return (
        <div className='login_container'>

            <div className='application'>

                <LogoutIcon />

                Please login here!

            </div>

            <form onSubmit={handleSubmit}>

                <input type='text' placeholder='username' ref={nameRef}></input>

                <input type='password' placeholder='password' ref={passRef}></input>

                <button className='login_button'>Login</button>

            </form>

            <CloseIcon className='login_cancel' onClick={() => setShowLogin(false)} />

        </div>
    )
}

export default Login