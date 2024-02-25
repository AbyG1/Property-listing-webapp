import React from 'react'
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <>
    <div className="container">
          <div className="row p-5 justify-content-center">
            <div className="col-md-6">
                
                <div className='d-flex flex-column'>
                    <h1 className='text-center'>Sign Up</h1>
                    <TextField id="filled-basic" label="username" variant="filled" className='mb-3'/>
                    <TextField id="filled-basic" label="email" variant="filled" className='mb-3'/>
                    <TextField id="filled-basic" label="password" variant="filled" className='mb-3'/>

                    <button className='btn btn-danger mb-2'>SIGN UP</button>

                    <p>Have an account? 
                      <Link to={'/sign-in'}>
                      <span className='lead text-info'> sign in</span>
                      </Link></p>

                </div>
                

            </div>
          </div>
    </div>
    
    
    
    </>
  )
}

export default SignUp