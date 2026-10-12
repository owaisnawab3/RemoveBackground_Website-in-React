// import React from 'react'
import Logo from '../assets/image/pngegg.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faBarsStaggered } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

function Navbar() {

  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);

  const [isOpen, setIsOpen] = useState(false)

  // NAVBAR-SCROLLING-FUNCTION

  useEffect(() => {

    console.log("USEEFFECT CHAL RAHA HAi")

    const handleScroll = () => {
      console.log("scroll", window.scrollY)
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [])


  return (
    <div className={`Main-Header ${isScrolled ? "scrolled" : ''}`}
    //   style={{
    //   backgroundColor: isScrolled
    //     ? 'rgba(255, 255, 255, 0.5)'
    //     : 'white'
    // }}
    >
      <header>
        <div className='logo'>
          <img onClick={() => navigate("/")} src={Logo} alt="Logo" />
        </div>
        <nav className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <ul className='menu-links'>
            <li><a href='' onClick={() => navigate("upload")} className='remove'>Remove Background</a></li>
            <li><a href="https://www.remove.bg/f/batch-editing" target='_blank'>How to use <FontAwesomeIcon className='icon' icon={faAngleDoubleDown} /></a></li>
            <li><a href="https://www.remove.bg/api" target='_blank'>Tools & API</a></li>
            <li><a href="https://www.remove.bg/pricing" target='_blank'>Pricing</a></li>
          </ul>
          <div className='mobile-login-signup'>
            <a
              className='login'
              onClick={() => navigate('/users/sign_in')}>
              Log in
            </a>
            <a
              className='sign-up'
              onClick={() => navigate('/users/sign_up')}>
              Sign up
            </a>
          </div>
        </nav>
      </header>
      <div className='login-signup'>
        <a
          className='login'
          onClick={() => navigate('/users/sign_in')}>
          Log in
        </a>
        <a
          className='sign-up'
          onClick={() => navigate('/users/sign_up')}>
          Sign up
        </a>
        <FontAwesomeIcon
          className='menu-bar'
          onClick={() => setIsOpen(!isOpen)}
          icon={faBarsStaggered} />
      </div>
    </div>
  )
}

export default Navbar
