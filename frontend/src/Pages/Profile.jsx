import React from 'react'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';

function Profile() {
  const { currentUser} = useSelector((state) => state.user)
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className='text-center mt-4'>Profile</h1>
          <form className='d-flex flex-column pb-2'>
            <div className='text-center m-3'>
              <img src={currentUser.avatar} alt="profile" className='rounded-pill w-25' />
            </div>
              
              <TextField id="username" label="username" variant="outlined" className='mb-3' />
              <TextField id="email" label="email" variant="outlined" className='mb-3' />
              <TextField id="password" label="password" variant="outlined" className='mb-3' />
              <button className='p-3 btn btn-success'>Update</button>


          </form>
          
          <div className='mb-3 '>
            <button className='btn btn-danger w-100 p-3'>Sign Out</button>
            <p className='text-danger m-2'>Delete User</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Profile



{/* */}