import React from 'react'
import './SignUp.css'
import NavbarReg from "../components/NavbarReg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faImage, faChevronRight, faGlobe } from '@fortawesome/free-solid-svg-icons'
import Facebook_Img from '../assets/image/facebook.jpg'
import Google_Img from '../assets/image/google.jpg'
import Image from '../assets/image/image.jpg'
import { Link, useNavigate } from 'react-router';

function Login() {

  const navigate = useNavigate();

  return (
    <>
      <NavbarReg />
      <div className="Singup-Page">

        <h1 className="">Log in with your Kaleido Account</h1>

        <p className='create-account'>
          or create a {" "}
          <Link to="/users/sign_up">new account</Link>
          {" "} for free
        </p>

        <div className="Kaleido-info">

          <span>
            <img src={Image} alt="" />
          </span>
          <p>
            You can use your Kaleido Account for <a href='' onClick={() => navigate("/upload")}> remove.bg,</a> <a href="https://www.canva.com/features/video-background-remover/" target='_blank'> unscreen.com </a> and <a href="https://www.canva.com/features/ai-photo-editing/" target='_blank'> designify.com </a> services.
          </p>
        </div>

        <div className="Signup-Card">

          <div className="Signup-Tabs login-tabs">
            <button
              //   onClick={() => navigate('users/sign_in')}
              className='login-auth'
            >Log in</button>
            <button
              className='signup-auth'
              onClick={() => navigate('/users/sign_up')}
            >Sign up</button>
          </div>

          <div className='card-content'>

            <div className="social-buttons">
              <button>
                <img className='social-icons facebook-icon' src={Facebook_Img} alt="" />
                Continue with Facebook
              </button>
              <button>
                <img className='social-icons google-icon' src={Google_Img} alt="" />
                Continue with Google
              </button>
            </div>

            <div className="divider">
              <span></span>
              <p>or</p>
              <span></span>
            </div>

            <form action="">
              <label htmlFor="">Email</label>
              <input type="email" required name="" id="" />

              <label htmlFor="">Password <i>(8 characters minimum)</i></label>
              <input type="password" required name="" id="" />

              <label htmlFor="">Password confirmation</label>
              <input type="password" required name="" id="" />

              <div className="checkboxes">
                <div className='checkbox-row'>
                  <input type="checkbox" required name="" id="" />
                  <span>
                    Remember me
                  </span>
                </div>
              </div>

              <button className="signup-button" type='submit'>
                Log in
              </button>

            </form>
          </div>
        </div>
        <div className="bottom-links">
          <a href="">Forgot your password?</a>
          <a href="">Didn't receive confirmation instructions?</a>
          <a href="">Didn't receive unlock instructions?</a>
        </div>
      </div>
      <footer className='footer'>
        <div className='footer-container'>

          <div className='footer-left'>
            <a href="https://accounts.kaleido.ai/languages">
              <div className='footer-english-part'>
                <FontAwesomeIcon className='globe-icon' icon={faGlobe} />
                <h4>English</h4>
                <FontAwesomeIcon className='arrow-icon' icon={faChevronRight} />
              </div>
            </a>
            <div>
              <a href="https://www.remove.bg/support" target='_blank'><h4>Need help?</h4></a>
            </div>
          </div>

          <div className='footer-right'>
            <a href="" onClick={() => navigate("/upload")}>remove.bg</a>
            <p>|</p>
            <a href="https://www.canva.com/features/video-background-remover/" target='_blank'>unscreen</a>
            <p>|</p>
            <a href="https://www.canva.com/features/ai-photo-editing/" target='_blank'>designify</a>
            <p>|</p>
            <a href="https://www.kaleido.ai/tos" target='_blank'>Terms of Service</a>
            <p>|</p>
            <a href="https://accounts.kaleido.ai/cookies" target='_blank'>Cookie Policy</a>
            <p>|</p>
            <a href="https://accounts.kaleido.ai/imprint" target='_blank'>Imprint</a>
            <p>|</p>
            <a href="https://accounts.kaleido.ai/privacy" target='_blank'>Privacy Policy</a>
          </div>
          <p className='copyright'>&copy; Kaleido, a Canva Austria GmbH brand</p>
        </div>
      </footer>
    </>
  )
}

export default Login