import React from 'react'
import './loading.css'
import freeImg from '../assets/image/FreeImage.png'

function Loading() {
  return (
    <div>
      <div className='loading-container'>
     <h4>Remove Image Background</h4>
     <div className='nd-line'>
     <h4>100% Automatically and</h4>
     <img src={freeImg} alt="free_img" />
     </div>
    </div>
    </div>
  )
}

export default Loading
