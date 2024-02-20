import React, { useRef } from 'react'

import "./Login.css"

import axios from 'axios'

import LogoutIcon from '@mui/icons-material/Logout';

import CloseIcon from '@mui/icons-material/Close';

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

            const res = await axios.post("/users/login", newUser);

            console.log(res);
            setCurrentUser(res.data.userName)
            setShowLogin(false);

        } catch (err) {
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

                <input type='text' placeholder='password' ref={passRef}></input>

                <button className='login_button'>Login</button>

            </form>

            <CloseIcon className='login_cancel' onClick={() => setShowLogin(false)} />

        </div>
    )
}

export default Login