
import {FaSearch} from 'react-icons/fa'
import React, { useState } from 'react';
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
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
function Header() {
    const [openBasic, setOpenBasic] = useState(false);
    const {currentUser} = useSelector(state => state.user)
  return (
    <header>
            <MDBNavbar expand='lg' light className='bg-secondary'>
      <MDBContainer fluid>

        <MDBNavbarBrand ><span className="fw-bolder text-primary">Prime </span> <span className='fw-semibold'>Properties</span></MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar open={openBasic} >


          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='search...' aria-label='Search' />
            <MDBBtn color='primary'><FaSearch/></MDBBtn>
          </form>


          <MDBNavbarNav className=' d-flex justify-content-end mb-2 mb-lg-0'>
            <Link to='/'>
                <MDBNavbarItem>
                <MDBNavbarLink active aria-current='page'>
                    Home
                </MDBNavbarLink>
                </MDBNavbarItem>
            </Link>

            <Link to='/about'>
                <MDBNavbarItem>
                    <MDBNavbarLink >About</MDBNavbarLink>
                </MDBNavbarItem>
            </Link>
           
    

            <MDBNavbarItem>
                  <Link to="/profile">
                    <MDBNavbarLink>
                      {currentUser ? (
                        <img
                          className='rounded-pill'
                          src={currentUser.avatar}
                          alt='profile'
                          style={{width:"25px"}}
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

{/* <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link> */}