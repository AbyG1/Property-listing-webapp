import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../Components/OAuth';


function SignIn() {
  const [formData, setFormData] = useState({});
 const {loading, error} = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };
  return (
    <>
    <div className="container">
          <div className="row p-5 justify-content-center">
            <div className="col-md-6">
                
              
                    <h1 className='text-center'>Sign In</h1>
                    <form onSubmit={handleSubmit} className='d-flex flex-column ' > 
                        
                        <TextField id="email" label="email" variant="filled" className='mb-3'onChange={handleChange}/>
                        <TextField id="password" type='password' label="password" variant="filled" className='mb-3'onChange={handleChange}/>
                      <div className=' mb-2 text-center'>
                         <button disabled={loading} className='p-3 btn btn-danger w-100'>{ loading ? "Loading..." : 'SIGN IN'}</button>
                         <OAuth></OAuth>
                      </div>
                       
                    </form>
                    <p className='text-center'>Dont have an account? 
                      <Link to={'/sign-up'}>
                      <span className='lead text-info'> sign up</span>
                      </Link></p>
                      {error && <p className='text-red-500 mt-5'>{error}</p>}

            </div>
          </div>
    </div>
    
    
    
    </>
  )
}

export default SignIn