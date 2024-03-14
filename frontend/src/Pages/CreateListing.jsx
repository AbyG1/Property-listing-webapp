import React, { useState } from 'react'
import image from '../assets/listProperty.gif'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

function CreateListing() {

  const [imageUploadError, setImageUploadError] = useState(false);
  const [files,setFiles] = useState([])
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false)
  const navigate =  useNavigate()
  const {currentUser} = useSelector(state => state.user)
  const [loading,setLoading] = useState(false)
  const [formData, setFormData] = useState({
    imageUrls: [],
    name:'',
    description:'',
    address:'',
    type:'rent',
    bedrooms:0,
    bathrooms:0,
    regularPrice:500,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
    property:'house',
    ploatArea:0,
    length:0,
    width:0,
    roadWidth:0
  })
  console.log(formData)


  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };
 
   const storeImage = async(file) => {
      return new Promise((resolve,reject) => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = 
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100
             console.log(`Upload is ${progress}% done`)
          },
          (error) => {
            reject(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL)
            })
          }
        )
      })
   }

   const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };
    

    const handleChange = (e) => {
      if(e.target.id === 'sell' || e.target.id === 'rent'){
        setFormData({
            ...formData,
            type: e.target.id
          })
      }
      if(e.target.id === 'house' || e.target.id === 'apartment' || e.target.id === 'rland'){
        setFormData({
            ...formData,
            property: e.target.id
          })
      }
      if(e.target.id === 'parking' || e.target.id ==='furnished' || e.target.id ==='offer' ){
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked
        })
      }
      if (
        e.target.type === 'number' ||
        e.target.type === 'text' ||
        e.target.type === 'textarea'
      ) {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value,
        });
      }
    };
  

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        if (formData.imageUrls.length < 1)
          return setError('You must upload at least one image');
        if (+formData.regularPrice < +formData.discountPrice)
          return setError('Discount price must be lower than regular price');
        setLoading(true);
        setError(false);
        const res = await fetch('/api/listing/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            userRef: currentUser._id,
          }),
        });
        const data = await res.json();
        setLoading(false);
        if (data.success === false) {
          setError(data.message);
        }
        navigate(`/listing/${data._id}`);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };




  return (
    <main>
        <div className="container-fluid">
          <div className="row my-3">
              <div className="col-md-9">
                  <p className='text-primary m-3 display-5'>Sell or Rent your property with <br /> <span className='fw-bolder text-secondary'>Prime</span> <span className='fw-bolder text-dark'>Properties</span></p>
                  <li style={{listStyleType:"none"}} className="text-success mx-5 h3 fw-bolder"><i className="fa-sharp fa-solid fa-check  me-1"></i> Get unlimited enquires</li>
                  <li style={{listStyleType:"none"}} className="text-success mx-5 h3 fw-bolder"><i className="fa-sharp fa-solid fa-check me-1"></i> Assistence in co-ordinating</li>
                  <li style={{listStyleType:"none"}} className="text-success mx-5 h3 fw-bolder"><i className="fa-sharp fa-solid fa-check me-1"></i> Easy to upload</li>            

              
              </div>
              <div className="col-md-3">
                  <div className='card shadow p-4 ' style={{background:"#230B5B"}}>
                          <p className='text-light fw-bolder'>Upload your properties in 3 simple steps</p> 
                          <ul>
                            <li className='text-light'  style={{listStyleType:"none"}}><i className="fa-solid fa-circle-info me-2"></i>Add basic details</li>
                            <li className='text-light' style={{listStyleType:"none"}}><i className="fa-solid fa-money-bill me-2"></i>Add Pricing</li>
                            <li className='text-light' style={{listStyleType:"none"}}><i className="fa-solid fa-photo-film me-1"></i>Add photos</li> 
                        </ul>

                  </div>
              </div>
          </div>
          <div className="row py-5">
            <div className="col-md-6 ">
              <img src={image} alt="list-propety-gif" className='img-fluid'  />
            </div>
            <div className="col-md-6">
              <div className='card  p-3 ' style={{background:'#F6FBFF'}}>
                  <h3 className='text-center'>Create Listing</h3>
                  <form onSubmit={handleSubmit}>
                            <div className='d-flex flex-column align-items-center'>
                                <input onChange={handleChange} value={formData.name} type="text" placeholder='Name' id="name" className='form-control mb-2'/>
                                <textarea name="" 
                                placeholder='Description'
                                 className='form-control mb-2' 
                                 id="description"
                                 onChange={handleChange}
                                 value={formData.description}></textarea>
                                <input type="text"
                                 placeholder="Address"
                                 id="address"
                                  className='form-control mb-2'
                                  value={formData.address}
                                  onChange={handleChange}
                                 />
                                
                                <div className=" d-flex w-100 my-2">
                                      <input type="checkbox"
                                       id='sell' 
                                       className="ms-md-2 me-md-1"
                                       onChange={handleChange} checked={formData.type === "sell"}/>
                                      <label htmlFor="sell"
                                      >Sell</label>
                                      <input type="checkbox"
                                       id='rent'
                                        className="ms-md-2 me-md-1 "
                                        onChange={handleChange} checked={formData.type === "rent"}/>
                                      <label htmlFor="rent">Rent/Lease</label>


                                </div>

                                <div className='d-flex w-100'>
                                        <input type="checkbox"
                                         className="ms-md-2 me-md-1 "
                                          id="offer"
                                          onChange={handleChange} checked={formData.offer} />
                                        <label htmlFor="offer">Offer</label>
                                </div>

                                    <div className='d-flex w-100 my-2 '>
                                          <div className='d-flex align-items-center'> 
                                            <input type="checkbox"
                                             className="ms-md-2 me-md-1 "
                                             name=''
                                             value="" 
                                            id='house'
                                            onChange={handleChange} checked={formData.property === "house"} />
                                            <label htmlFor="house">House</label>
                                          </div>
                                          <div className='d-flex align-items-center' >
                                                <input type="checkbox"
                                                 className="ms-md-2 me-md-1 "
                                                 name=''
                                                 value="" 
                                                id='apartment'
                                                onChange={handleChange} checked={formData.property === "apartment"} />
                                              <label htmlFor="apartment">Apartment</label>
                                          </div>
                                          <div className='Name'>
                                              <input type="checkbox"
                                               className="ms-md-2 me-md-1 "
                                               name=''
                                               value=""
                                               id='rland'
                                               onChange={handleChange} checked={formData.property === "rland"}
                                               />
                                              <label htmlFor="rland">Residential Land</label>
                                          </div>
                                        
                                          
                                        
                                    </div>

                                    <div className='d-flex w-100 my-2'>
                                        <input type="checkbox"
                                         className="ms-md-2 me-md-1 "
                                         id='parking'
                                         onChange={handleChange}
                                         checked={formData.parking} />
                                        <label htmlFor="parking">Parking spot</label>
                                        <input type="checkbox"
                                       onChange={handleChange}
                                       checked={formData.furnished} className="ms-md-2 me-md-1 "
                                         id="furnished"
                                         />
                                        <label htmlFor="furnished">Furnished</label>
                                      
        
                                    </div>
                                  {(formData.property)!=='rland' && (
                                    <div className='d-flex w-100  my-2'>
                                          <div className=' d-flex align-items-center mb-2'>
                                            <input type="number" onChange={handleChange}
                                             className='form-control w-50 me-md-2' id="bedrooms" min="1" max="10" required/>
                                            <label htmlFor="bedrooms">Beds</label>
                                          </div >
                                          <div className=' d-flex align-items-center mb-2'>
                                            <input type="number"
                                            onChange={handleChange} className='form-control w-50 me-md-2' id="bathrooms" min="1" max="10" required/>
                                            <label htmlFor="bathrooms">Baths</label>
                                          </div>
                                    </div>
                                 
                                 )}
                                    
                                    
                              
                              {formData.property==='rland' && (

                            <div className='d-flex w-100 my-2 flex-column'>

                            <div className='d-flex align-items-center me-md-2 mb-1 '>
                                <label htmlFor="ploatArea" className='w-25'>PloatArea</label>
                                <input type="number" onChange={handleChange}  className='form-control w-50' id="ploatArea"  min="1" required />
                                <label htmlFor="ploatArea">sqft</label>
                            </div>
                            <div className='d-flex align-items-center me-md-2 mb-1'>
                                <label htmlFor="length" className='w-25'>Length</label>
                                <input type="number" onChange={handleChange} className='form-control w-50' id="length"  min="1" required/>
                                <label htmlFor="length">ft</label>
                            </div>
                            <div className='d-flex align-items-center me-md-2 mb-1' >
                              <label htmlFor="width" className='w-25'>Width</label>
                              <input type="number" onChange={handleChange}  className='form-control w-50' id="width"  min="1" required />
                              <label htmlFor="width" > ft</label>
                            </div>
                            <div className='d-flex align-items-center me-md-2 mb-1' >
                              <label htmlFor="roadWidth" className='w-25'>Width of facing road</label>
                              <input type="number" className='form-control w-50' onChange={handleChange}  id="roadWidth"  min="1" required />
                              <label htmlFor="roadWidth" > ft</label>
                            </div>

                            </div>

                              )}
                              
                              <div className='d-flex w-100 mb-3 '>
                                            <div className=' d-flex  w-100 '>
                                                <input type="number"
                                                onChange={handleChange}
                                                value={formData.regularPrice}
                                                 className='form-control w-50 me-md-2' id="regularPrice" min="500" max="100000000" required/>
                                                <div className='d-flex flex-column'>
                                                  <label htmlFor="regularPrice">Regular Price</label>
                                                  {formData.type==='rent' && (
                                                    <small><label htmlFor="regularPrice" className='text-muted'>(Rs/month)</label></small>
                                                  )}
                                                  
                                                </div>
                                                
                                                
                                            </div>
                                            {formData.offer &&  (
                                                <div className=' d-flex  w-100 '>
                                                <input type="number"
                                                 onChange={handleChange}
                                                 value={formData.discountPrice}
                                                className='form-control w-50 me-md-2 ' id="discountPrice" min="0" max="100000000" required/>
                                                <div className='d-flex flex-column' >
                                                  <label htmlFor="discountPrice">Discounted Price</label>
                                                  <small> <label htmlFor="discountPrice" className='text-muted'>(Rs/month)</label></small>
                                                </div>
                                              
                                            </div>  
                                          )  }
                                            
                                      
                                    </div>

                              <div className='d-flex flex-column w-100'>
                                  <p><span className='fw-bold'>Images:</span>The first image will be the cover (max 6)</p>
                                  <div className='d-flex mb-2 gap-md-5'>
                                    <input onChange={(e) => setFiles(e.target.files)} className="border p-2" type="file" id="images" accept="image/*" multiple />
                                    <button type='button' onClick={handleImageSubmit} className='btn btn-outline-success'>{uploading ? "Uploading..." : 'Upload'}</button>
                                    
                                  </div>
                                <small className='text-danger'>{imageUploadError && imageUploadError}</small>

                                {
                                    formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
                                      <div key={url} className='d-flex justify-content-between p-3 border align-items-center'>
                                        <img src={url} alt="listing image" className='w-25  rounded' style={{objectFit:"contain"}}/>
                                        <button className='btn btn-danger rounded' type='button' onClick={() => handleRemoveImage(index)}>Delete</button>
                                      </div>
                                      
                                    ))
                                  }
                                </div>   


                        </div>

                        <button disabled={loading || uploading} className='btn btn-lg  btn-success w-100'>{loading ? 'Creating...' : 'Create listing'}</button>
                  
                        {error && <small className='text-danger'>{error}</small>}
                  </form>
                  
              </div>
            </div>
          </div>
        </div>




    </main>
  )
}

export default CreateListing