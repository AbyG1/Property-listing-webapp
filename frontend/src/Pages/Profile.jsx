import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import TextField from '@mui/material/TextField';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase';


function Profile() {
  const { currentUser} = useSelector((state) => state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  },[file])

  const handleFileUpload = (file) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName) 
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => {
            setFormData({...formData, avatar:downloadURL})
        })
      }
      )
  }

  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className='text-center mt-4'>Profile</h1>
          <form className='d-flex flex-column pb-2'>
            <input onChange={(e) => setFile(e.target.files[0])}   type="file" ref={fileRef} hidden accept='image/*' />
            <div className='text-center m-3'>
              <img onClick={() => fileRef.current.click() }src={formData.avatar || currentUser.avatar} alt="profile" className='rounded-pill w-25' />
              <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-danger'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-warning'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-success'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
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