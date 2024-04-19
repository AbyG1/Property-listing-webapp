import React, { useEffect, useState } from 'react'
import photo from '../assets/xxl.webp'
import {Link} from 'react-router-dom'
import SignUp from './SignUp'
import ListingItem from '../Components/ListingItem'



function Home() {

  const [house, setHouseListings] = useState([])
  const [apartment, setApartmentListings] = useState([])
  const [land, setLandListings] = useState([])



  useEffect(() => {
    const fetchHouseListing = async() => {
        try {
          const res = await fetch('/api/listing/get?property=house&limit=4')
          const data = await res.json()
          setHouseListings(data)
          fetchApartmentListing()
        } catch (error){
          console.log(error)
        }
    }
    const fetchApartmentListing = async() => {
      try {
        const res = await fetch('/api/listing/get?property=apartment&limit=4')
        const data = await res.json()
        setApartmentListings(data)
        fetchLandListing()
      } catch (error){
        console.log(error)
      }
    }
    const fetchLandListing = async() => {
      try {
        const res = await fetch('/api/listing/get?property=rland&limit=4')
        const data = await res.json()
        setLandListings(data)
        
      } catch (error){
        console.log(error)
      }
    }
    fetchHouseListing()
  },[])



  return (
  <>
    <div className='container-fluid'>

          <div className="row">
              <div className="col position-relative px-0 "> 
                  <img src={photo} className='img-fluid' alt="" />
                  <div className='position-absolute top-0 start-0'>
                      <h1 className='display-1 text-light text-center '>Discover the Most Suitable Property</h1>        
                    
                  </div>
                  <div className='w-75 p-5 mx-auto'>
                      <p className='text-md-justify text-cen text-primary h5 fw-bolder'> Welcome to Prime Properties,<span className='d-none d-md-inline'> your premier destination for finding the perfect place to call home. Whether you're searching for a cozy apartment in the heart of the city, a spacious family home in the suburbs, or a luxurious estate overlooking breathtaking landscapes, we're here to make your dream a reality.</span></p>
                      <Link to={'/search'}><p className='h5 fw-bold  text-success'> Get Started</p></Link>
                  </div>
                </div>
          </div>
    </div>
    <div className="container-md border">
   
      {house && house.length > 0 && (
         <div className="row mb-2">
              <h3>Houses</h3>
              <Link className='text-secondary' to={'/search?property=house'}>Show more offers</Link>
              
              {house.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}

          
         
        </div>
         

      )}

{apartment && apartment.length > 0 && (
         <div className="row mb-2">
              <h3>Apartments</h3>
              <Link className='text-secondary' to={'/search?property=apartment'}>Show more offers</Link>
              
              {apartment.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}

          
         
        </div>
         

      )}

{land && land.length > 0 && (
         <div className="row mb-2">
              <h3>Residential Plot for Sale</h3>
              <Link className='text-secondary' to={'/search?property=rland'}>Show more offers</Link>
              
              {land.map((listing) => (
                    <ListingItem listing={listing} key={listing._id} />
                  ))}

          
         
        </div>
         

      )}


     

    </div>
      
        


   </> 
  )
}

export default Home