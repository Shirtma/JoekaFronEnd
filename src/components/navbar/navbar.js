import React from 'react'
import styled from 'styled-components'
import logo from '../../images/JOEKA.png'
// import logo from '../../images/thehouse-logo.png'
import { Link } from 'react-router-dom'
import { links } from '../../util/constants'
import Button from '../button'
import colours from '../../lib/colours'
// import { useProductsContext } from '../context/products_context'
// import { useUserContext } from '../context/user_context'

const Navbar = () => {
 // const { openSideBar } = useProductsContext()
 // const { myUser } = useUserContext()

 return (
   <NavContainer>
     <div className='nav-center'>
       <ul className='nav-links'>
         <li>
           <div className='nav-header'>
             <Link to='/'>
               <img src={logo} alt='log-img' />
             </Link>
             {/* <button type='button' className='nav-toggle' onClick={openSideBar}> */}
             {/* <FaBars /> */}
             {/* </button> */}
           </div>
         </li>
         {links.map((link) => {
           const { id, text, url } = link
           return (
             <li key={id}>
               <Link to={url}>{text}</Link>
             </li>
           )
         })}
         {/* {myUser && (
           <li>
             <Link to='/checkout'>checkout</Link>
           </li>
         )} */}
       </ul>
       <div className='nav-user'>
        <Link to="/signin">
         <p className="text">Signin</p>
        </Link>
         <Button
           text='Order!'
           backgroundColour={colours.onyxBlack}
           iconColour={colours.royalBurgundy}
           width='14.3rem'
         />
       </div>
     </div>
   </NavContainer>
 )
}


const NavContainer = styled.nav`
  height: 7.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #D4AF37;
 

  .nav-center {
    width: 144rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    max-width: 1440px;
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -15px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      width: 56.3rem;
      align-items: center;
      font-family: 'Montserrat', sans-serif;
      font-weight: 400;
      margin-left: 4rem;
      li {
        margin: 0 0.5rem;
        list-style: none;
      }
      a {
        color: #000000;
        font-size: 1.6rem;
        text-decoration: none;
        line-height: 2rem;
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid var(--clr-primary-7);
        }
      }
    }
    .nav-user {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 24rem;
      a {
        color: #000000;
        font-size: 1.6rem;
        font-weight: 400;
        text-transform: capitalize;
        text-decoration: none;
        line-height: 2rem;
      }
    }
  }
`

export default Navbar
