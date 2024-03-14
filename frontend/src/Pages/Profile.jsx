import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  

} from '../redux/user/userSlice';


import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className='container'>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className='text-center mt-4'>Profile</h1>
          <form onSubmit={handleSubmit} className='d-flex flex-column pb-2'>
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
              
              <TextField onChange={handleChange}defaultValue={currentUser.username} id="username" label="username" variant="outlined" className='mb-3' />
              <TextField onChange={handleChange}defaultValue={currentUser.email} id="email" label="email" variant="outlined" className='mb-3' />
              <TextField type='password' id="password" label="password" variant="outlined" className='mb-3' />
              <button disabled={loading} className='p-3 btn btn-success'>
                  {
                    loading ? 'Loading...' : "Update"
                  }
              </button>
              <Link to={'/create-listing'} className='btn btn-primary p-3 mt-2'>
                    Post Property
              </Link>

          </form>
          
          <div className='mb-3 '>
            <button className='btn btn-danger w-100 p-3' onClick={handleSignOut}>Sign Out</button>
            <p className='text-danger m-2'style={{cursor:"pointer"}} onClick={handleDeleteUser}>Delete User</p>
          </div>
          <p className='text-danger'>{error ? error : " "}</p>
          <p className='text-success'>{updateSuccess ? 'User is updated successfully' : " "}</p>
            
          <button className='btn btn-warning w-100 p-3' onClick={handleShowListings}>Show Property Listings</button>
        
          <p className='text-danger'>
            {showListingsError ? 'Error showing listing':''}
          </p>
         
          {userListings && userListings.length > 0 && (
        <div className='d-flex flex-column gap-4'>
          <h1 className='text-center mt-3  fs-bold'>
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className='border rounded p-3 d-flex justify-content-between align-items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-25 w-25 object-contain'
                />
              </Link>
              <Link
                className=' fw-bold  flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='d-flex flex-column justify-item-center'>
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className='text-danger btn btn-outline-danger p-2 '
                  
                >
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className='text-success btn btn-outline-success'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
        </div>
      </div>
    </div>
  )
}





