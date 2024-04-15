
import {FaSearch} from 'react-icons/fa'
import React, { useEffect, useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBCollapse,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
function Header() {
    const [openBasic, setOpenBasic] = useState(false);
    const {currentUser} = useSelector(state => state.user)
    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()


    const handleSubmit = (e) => {
      e.preventDefault()
      const urlParams = new URLSearchParams(window.location.search)
      urlParams.set('searchTerm', searchTerm)
      const searchQuery = urlParams.toString()
      navigate(`/search?${searchQuery}`)
    }
   
    useEffect(() => {

      const urlParams = new URLSearchParams(window.location.search)
      const searchTermFromUrl = urlParams.get('searchTerm')
      if(searchTermFromUrl){
          setSearchTerm(searchTermFromUrl)
      }

    },[location.search])
   
   
   
    return (
    <header>
            <MDBNavbar expand='lg' light className='bg-primary'>
      <MDBContainer fluid>

        <MDBNavbarBrand ><span className="fw-bolder text-secondary ">Prime </span> <span className='fw-semibold'>Properties</span></MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic} >


          <form onSubmit={handleSubmit} className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='search...' aria-label='Search' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            <MDBBtn color='light'><FaSearch/></MDBBtn>
          </form>
      

          <MDBNavbarNav className=' d-flex justify-content-end mb-2 mb-lg-0'>
            <Link to='/'>
                <MDBNavbarItem>
                <MDBNavbarLink  aria-current='page'  className='text-light'>
                    Home
                </MDBNavbarLink>
                </MDBNavbarItem>
            </Link>

            <Link to='/create-listing'>
                <MDBNavbarItem>
                    <MDBNavbarLink className='text-light' >List Property</MDBNavbarLink>
                </MDBNavbarItem>
            </Link>
           
    

            <MDBNavbarItem className='text-light'>
                  <Link to="/profile">
                    <MDBNavbarLink className='text-light'>
                      {currentUser ? (
                        <img
                          className='rounded-pill'
                          src={currentUser.avatar}
                          alt='profile'
                          style={{width:"25px",objectFit:'cover'}}
                        />
                      ) : (
                        "Sign in"
                      )}
                    </MDBNavbarLink>
                  </Link>
          </MDBNavbarItem>



          </MDBNavbarNav>

         
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
     
    </header>
  )
}

export default Header

