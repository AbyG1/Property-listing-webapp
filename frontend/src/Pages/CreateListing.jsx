import React from 'react'
import image from '../assets/listProperty.gif'

function CreateListing() {
  return (
    <main>
        <div className="container-fluid">
          <div className="row my-3">
              <div className="col-md-9">
                  <p className='text-primary m-3 display-5'>Sell or Rent your property with <br /> <span className='fw-bolder text-secondary'>Prime</span> <span className='fw-bolder text-dark'>Properties</span></p>
                  <li style={{listStyleType:"none"}} className="text-success mx-5 h3 fw-bolder"><i class="fa-sharp fa-solid fa-check  me-1"></i> Get unlimited enquires</li>
                  <li style={{listStyleType:"none"}} className="text-success mx-5 h3 fw-bolder"><i class="fa-sharp fa-solid fa-check me-1"></i> Assistence in co-ordinating</li>
                  <li style={{listStyleType:"none"}} className="text-success mx-5 h3 fw-bolder"><i class="fa-sharp fa-solid fa-check me-1"></i> Easy to upload</li>            

              
              </div>
              <div className="col-md-3">
                  <div className='card shadow p-4 ' style={{background:"#230B5B"}}>
                          <p className='text-light fw-bolder'>Upload your properties in 3 simple steps</p> 
                          <ul>
                            <li className='text-light'  style={{listStyleType:"none"}}><i class="fa-solid fa-circle-info me-2"></i>Add basic details</li>
                            <li className='text-light' style={{listStyleType:"none"}}><i class="fa-solid fa-photo-film me-1"></i>Add photos</li>
                            <li className='text-light' style={{listStyleType:"none"}}><i class="fa-solid fa-money-bill me-2"></i>Add Pricing</li>
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
                  <form>
                            <div className='d-flex flex-column align-items-center'>
                                <input type="text" placeholder='Name' className='form-control mb-2'/>
                                <textarea name="" placeholder='Description' className='form-control mb-2' id=""></textarea>
                                <input type="text" placeholder="Address" className='form-control mb-2'/>
                                
                                <div className=" d-flex w-100 my-2">
                                      <input type="checkbox" id='sell' className="ms-md-2 me-md-1"/>
                                      <label htmlFor="sell">Sell</label>
                                      <input type="checkbox" id='rent' className="ms-md-2 me-md-1 "/>
                                      <label htmlFor="rent">Rent/Lease</label>


                                </div>

                                <div className='d-flex w-100'>
                                        <input type="checkbox" className="ms-md-2 me-md-1 " id="offer" />
                                        <label htmlFor="offer">Offer</label>
                                </div>

                                    <div className='d-flex w-100 my-2 '>
                                          <div d-flex align-items-center> 
                                            <input type="checkbox" className="ms-md-2 me-md-1 " name='' value="" id='house' />
                                            <label htmlFor="house">House</label>
                                          </div>
                                          <div d-flex align-items-center>
                                                <input type="checkbox" className="ms-md-2 me-md-1 " name='' value="" id='apartment' />
                                              <label htmlFor="apartment">Apartment</label>
                                          </div>
                                          <div d-flex align-items-center>
                                              <input type="checkbox" className="ms-md-2 me-md-1 " name='' value="" id='rland' />
                                              <label htmlFor="rland">Residential Land</label>
                                          </div>
                                        
                                          
                                        
                                    </div>

                                    <div className='d-flex w-100 my-2'>
                                        <input type="checkbox" className="ms-md-2 me-md-1 " id='parking' />
                                        <label htmlFor="parking">Parking spot</label>
                                        <input type="checkbox" className="ms-md-2 me-md-1 " id="furnished" />
                                        <label htmlFor="furnished">Furnished</label>
                                      
        
                                    </div>

                                    <div className='d-flex w-100  my-2'>
                                          <div className=' d-flex align-items-center mb-2'>
                                            <input type="number" className='form-control w-50 me-md-2' id="bedrooms" min="1" max="10" required/>
                                            <label htmlFor="bedrooms">Beds</label>
                                          </div >
                                          <div className=' d-flex align-items-center mb-2'>
                                            <input type="number" className='form-control w-50 me-md-2' id="bathrooms" min="1" max="10" required/>
                                            <label htmlFor="bathrooms">Baths</label>
                                          </div>
                                    </div>
                                    <div className='d-flex w-100'>
                                            <div className=' d-flex  w-100 '>
                                                <input type="number" className='form-control w-50 me-md-2' id="regularPrice" min="1" max="10" required/>
                                                <div>
                                                  <label htmlFor="regularPrice">Regular Price</label>
                                                <small><label htmlFor="regularPrice" className='text-muted'>(Rs/month)</label></small>
                                                </div>
                                                
                                                
                                            </div>
                                            <div className=' d-flex  w-100 '>
                                                <input type="number" className='form-control w-50 me-md-2 ' id="discountPrice" min="1" max="10" required/>
                                                <div>
                                                  <label htmlFor="discountPrice">Discounted Price</label>
                                                  <small> <label htmlFor="discountPrice" className='text-muted'>(Rs/month)</label></small>
                                                </div>
                                              
                                            </div>
                                      
                                    </div>
                              
                              
                              <div className='d-flex w-100 my-2 flex-column'>

                                  <div className='d-flex align-items-center me-md-2 mb-1 '>
                                      <label htmlFor="area" className='w-25'>PloatArea</label>
                                      <input type="number" className='form-control w-50' id="area"  min="1" required />
                                      <label htmlFor="area">sqft</label>
                                  </div>
                                  <div className='d-flex align-items-center me-md-2 mb-1'>
                                      <label htmlFor="length" className='w-25'>Length</label>
                                      <input type="number" className='form-control w-50' id="length"  min="1" required/>
                                      <label htmlFor="length">ft</label>
                                  </div>
                                  <div className='d-flex align-items-center me-md-2 mb-1' >
                                    <label htmlFor="width" className='w-25'>Width</label>
                                    <input type="number" className='form-control w-50' id="width"  min="1" required />
                                    <label htmlFor="width" > ft</label>
                                  </div>
                                  <div className='d-flex align-items-center me-md-2 mb-1' >
                                    <label htmlFor="roadwidth" className='w-25'>Width of facing road</label>
                                    <input type="number" className='form-control w-50' id="roadwidth"  min="1" required />
                                    <label htmlFor="roadwidth" > ft</label>
                                  </div>

                              </div>

                              <div className='d-flex flex-column w-100'>
                                  <p><span className='fw-bold'>Images:</span>The first image will be the cover (max 6)</p>
                                  <div className='d-flex mb-2 gap-md-5'>
                                    <input  className="border "type="file" id="images" accept="image/*" multiple />
                                    <button className='btn btn-outline-success'>Upload</button>
                                  </div>
                                
                                
                                </div>   


                        </div>

                        <button className='btn btn-lg  btn-success w-100'>Create list</button>
                  </form>
              </div>
            </div>
          </div>
        </div>




    </main>
  )
}

export default CreateListing