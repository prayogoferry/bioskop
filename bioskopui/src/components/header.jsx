import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {FaCartArrowDown} from 'react-icons/fa'


const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">CINEMA</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto"  navbar>
            {props.roleUser==='admin'?
            
            <NavItem>
              <NavLink href="/admin/">Manage Movie</NavLink>
              <NavLink href="/managestudio/">Manage Studio</NavLink>
            </NavItem>
            :
            null
            }

              {props.roleUser==='user'?
              
              <NavItem >
               
              <NavLink href="/cart/"><FaCartArrowDown/>: {props.carts}</NavLink>
            </NavItem>
            
              :
              null
              }
            {props.namauser===''?
            
             
                <NavItem > 
              <NavLink href="/register/">Register</NavLink>
    
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            
            
            :
            null
            }
            {
              props.namauser===''?
              null
              :
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {props.namauser}
              </DropdownToggle>
              <DropdownMenu right>
              <DropdownItem href="/history/">
                  History
                </DropdownItem>
                <DropdownItem href='/setting'>
                  Setting
                </DropdownItem>
                <DropdownItem href='/' onClick={()=>onSignOutClick()}>
                  Logout
                </DropdownItem>
                <DropdownItem divider />
              </DropdownMenu>
            </UncontrolledDropdown>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

const onSignOutClick=()=>{
  localStorage.clear()
  window.location.reload()
}

const MapstateToprops=(state)=>{
  return{
    namauser:state.Auth.username,
    roleUser:state.Auth.role,
    carts:state.Auth.cart
  }
}

export default connect (MapstateToprops) (Header);