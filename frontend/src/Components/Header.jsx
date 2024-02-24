
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


function Header() {
    const [openBasic, setOpenBasic] = useState(false);
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

        <MDBCollapse navbar open={openBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
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
           
        <Link to="/sign-in">
            <MDBNavbarItem>
              <MDBNavbarLink>
                Sign in
              </MDBNavbarLink>
            </MDBNavbarItem>
        </Link>
          </MDBNavbarNav>

          <form className='d-flex input-group w-auto'>
            <input type='search' className='form-control' placeholder='search...' aria-label='Search' />
            <MDBBtn color='primary'><FaSearch/></MDBBtn>
          </form>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
     
    </header>
  )
}

export default Header