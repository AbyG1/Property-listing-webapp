import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <>
    <div className="container">
          <div className="row p-5 justify-content-center">
            <div className="col-md-6">
                
              
                    <h1 className='text-center'>Sign Up</h1>
                    <form onSubmit={handleSubmit} className='d-flex flex-column ' > 
                        <TextField id="username" label="username" variant="filled" className='mb-3'onChange={handleChange}/>
                        <TextField id="email" label="email" variant="filled" className='mb-3'onChange={handleChange}/>
                        <TextField id="password" type='password' label="password" variant="filled" className='mb-3'onChange={handleChange}/>
                      <div className=' mb-2 text-center'>
                         <button disabled={loading} className='btn btn-danger w-100'>{ loading ? "Loading..." : 'SIGN UP'}</button>
                      </div>
                       
                    </form>
                    <p className='text-center'>Have an account? 
                      <Link to={'/sign-in'}>
                      <span className='lead text-info'> sign in</span>
                      </Link></p>
                      {error && <p className='text-red-500 mt-5'>{'username or email already exists'}</p>}

            </div>
          </div>
    </div>
    
    
    
    </>
  )
}

export default SignUp