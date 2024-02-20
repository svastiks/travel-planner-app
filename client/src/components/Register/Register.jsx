import React, { useRef } from 'react'

import LogoutIcon from '@mui/icons-material/Logout';

const Register = ({ setShowRegister }) => {

    const nameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    return (
        <div className='register_container'>

            <div className='application'>

                <LogoutIcon />

                Create an account.

            </div>

            <form>
                <input type='text' placeholder='Username' />
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />

            </form>

        </div>
    )
}

export default Register