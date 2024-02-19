import React from 'react'

import LogoutIcon from '@mui/icons-material/Logout';

import CloseIcon from '@mui/icons-material/Close';

const Login = (setShowLogin, setCurrentRegister) => {
    return (
        <div className='login_container'>

            <div className='application'>

                <LogoutIcon />

                Please login here!

            </div>

            <form>

                <input type='text' placeholder='username'></input>

                <input type='text' placeholder='password'></input>

                <button className='login_button'>Login</button>

            </form>

            <CloseIcon className='login_cancel' />

        </div>
    )
}

export default Login