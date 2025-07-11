import React, { useRef } from 'react'

import axios from 'axios'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import "./Register.css"

import LogoutIcon from '@mui/icons-material/Logout';

import CloseIcon from '@mui/icons-material/Close';

const userRegistered = (user) => {
    toast.success("You have successfully created a user: " + user)
}

const userNotRegistered = () => {
    toast.error("User not registered, please try again.")
}
const Register = ({ setShowRegister }) => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            userName: nameRef.current.value,
            email: emailRef.current.value,
            password: passRef.current.value
        }

        try {

            const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, newUser);

            console.log(res);

            setShowRegister(false);

            userRegistered(nameRef.current.value);

        } catch (err) {
            userNotRegistered();
            console.log(err);
        }


    }

    return (
        <div className='register_container'>

            <div className='application'>

                <LogoutIcon />

                Create an account.

            </div>

            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' ref={nameRef} />
                <input type='email' placeholder='Email' ref={emailRef} />
                <input type='password' placeholder='Password' ref={passRef} />

                <button className='register_button'>Register</button>

            </form>

            <CloseIcon className='register_cancel' onClick={() => setShowRegister(false)} />

        </div>
    )
}

export default Register