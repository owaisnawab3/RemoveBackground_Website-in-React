// import React from 'react'
import Video from '../assets/image/video.mp4'
import image1 from '../assets/image/image-01.jpg'
import image2 from '../assets/image/image-02.jpg'
import image3 from '../assets/image/image-03.jpg'
import image4 from '../assets/image/image-04.jpg'
import freeImage from '../assets/image/FreeImage.png'
import yellowLine from '../assets/image/yellow-round-line.png'
import yellowLine01 from '../assets/image/Yellow_Line.png'
import { data, useNavigate } from 'react-router-dom'



function Home() {

  const navigate = useNavigate();

  const clickHandle = () => {

  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      navigate('/upload', {
        state: { droppedFile: file }
      })
    }
  }

  return (
    <div className='Home-Container'>
      <div className='Home-Left'>
        <div className='Home-Video'>
          <video autoPlay loop>
            <source src={Video} type="video/mp4" />
          </video>

          <div className='heading'>
            <h1>Remove Image <br />
              Background
            </h1>
            <p>100% Automatically and <img src={freeImage} alt="" /> </p>

          </div>
          {/* <p>100% Automatically and <img src={freeImage} alt="" /> </p> */}
        </div>
        <div className='yellow-line'>
          <img src={yellowLine} alt="" />
        </div>
      </div>
      <div className='Home-Right'>
        <img src={yellowLine01} className="yellow-img02" alt="" />
        <div className='Home-Upload'>
          <div className='Hometext'>
            <a type='file' onClick={() => navigate("upload")} className='upload-image-button'>Upload Image</a>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <h4
                className="h4"
              >
                or drop a file,
              </h4>
            </div>
            <p className='url'>paste image or <span onClick={() => navigate('upload', {
              state: { fromHomeUrl: true }
            })}>url</span></p>
          </div>
        </div>
        <div className='images-container'>
          <div className='images-para'>
            <p>No image? </p>
            <p> Try one of these:</p>
          </div>
          <div className='image'>
            <img onClick={() => navigate('/upload', {
              state: { sampleImage: image1 }
            })} src={image1} alt="image_01" />
            <img onClick={() => navigate('/upload', {
              state: { sampleImage: image2 }
            })} src={image2} alt="image_02" />
            <img onClick={() => navigate('/upload', {
              state: { sampleImage: image3 }
            })} src={image3} alt="image_03" />
            <img onClick={() => navigate('/upload', {
              state: { sampleImage: image4 }
            })} src={image4} alt="image_04" />
          </div>
        </div>
        <div className='para'>
          {/* <p>By uploading an image or URL you agree to our <a href='https://www.remove.bg/tos' target="_blank">Terms of Service.</a> To learn more about how </p>
            <p>remove.bg handles your personal data, check our <a href='https://www.remove.bg/privacy' target="_blank">Privacy Policy.</a></p> */}
          <p>By uploading an image or URL you agree to our <a href='https://www.remove.bg/tos' target="_blank">Terms of Service.</a> To learn more about how remove.bg handles your personal data, check our <a href='https://www.remove.bg/privacy' target="_blank">Privacy Policy.</a></p>
        </div>
      </div>
    </div>
  )
}

export default Home
