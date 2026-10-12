import React from 'react'
import Navbar from '../components/Navbar'
import Star_Img from '../assets/image/Star.png'
import Theme_img from '../assets/image/theme-image.jpg'
import Theme_img01 from '../assets/image/theme-image-01.jpg'
import Theme_img02 from '../assets/image/theme-image02.jpg'
import Theme_img03 from '../assets/image/theme-image03.jpg'
import Theme_img04 from '../assets/image/theme-image04.jpg'
import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'
// import axios from 'axios'


function Upload() {

  const location = useLocation();
  const navigate = useNavigate();
  const fromHomeUrl = location.state?.fromHomeUrl;
  const droppedFile = location.state?.droppedFile;
  const sampleImage = location.state?.sampleImage

  const promptOpend = useRef(false);
  const pickerOpend = useRef(false);

  const clickHandle = () => {
    const userInput = prompt("Image URL:")

    if (userInput === null || userInput.trim() === "") {
      return;
    }

    //purani image aur result clear karo

    setImage(null);
    setImageUrl("");
    setPreviewImage(null);
    setResultImage(null);
    setError("");

    try {
      const parsedUrl = new URL(userInput);

      if (parsedUrl.protocol !== 'http:' &&
        parsedUrl.protocol !== 'https:') {
        setError("Please enter a valid image URL.")
        return;
      }
    } catch {
      setError('Please enter a valid image URL.')
      return;
    }

    if (userInput) {
      setImage(null);
      setImageUrl(userInput);
      setPreviewImage(userInput);
      setResultImage(null);
      setError("");
    }
    console.log(imageUrl);
  }

  const sampleImageHandle = async (sample) => {

    const response = await fetch(sample);

    const blob = await response.blob();

    const file = new File([blob], "sample-image-jpg", {
      type: blob.type
    });

    setImage(file);
    setImageUrl("");
    setPreviewImage(sample);
    setResultImage(null);
    setError("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    console.log(file);
    if (file) {
      setImage(file);
      setImageUrl("");
      setResultImage(null);
      setError("");

      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);

    }
  }

  const fileInputRef = useRef(null)

  useEffect(() => {

    // console.log("fromHomeURL", fromHomeUrl)

    if (sampleImage) {
      sampleImageHandle(sampleImage)
      // setImage(sampleImage);
      // setImageUrl("");
      // setPreviewImage(sampleImage);
      // setResultImage(null);
      // setError("");
    }
    else if (droppedFile) {
      setImage(droppedFile);
      setImageUrl("");
      setPreviewImage(URL.createObjectURL(droppedFile));
      setResultImage(null);
      setError("");
    }
    else if (fromHomeUrl) {
      if (!promptOpend.current) {
        promptOpend.current = true;

        navigate(location.pathname, {
          replace: true,
          state: null
        });
        clickHandle();
      }
    } else {
      fileInputRef.current?.click();
    }

  }, [])

  const [imageUrl, setImageUrl] = useState("");

  const [image, setImage] = useState(null);

  const [resultImage, setResultImage] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("")

  const apiKey = import.meta.env.VITE_REMOVE_BG_API_KEY;

  console.log(apiKey);
  console.log(image)

  //API Handling Best Practice

  const removeBackground = async () => {

    setLoading(true);

    try {
      const formData = new FormData();

      if (image) {
        formData.append("image_file", image);
      } else if (imageUrl) {
        formData.append("image_url", imageUrl)
      }

      console.log([...formData.entries()])

      const response = await fetch(
        "https://api.remove.bg/v1.0/removebg",
        {
          method: "POST",
          headers: {
            "X-Api-Key": apiKey,
          },
          body: formData
        }
      )
      console.log(response);

      if (!response.ok) {
        const error = await response.text();

        console.log("status:", response.status);
        console.log("Api error:", error);

        if (response.status === 400) {
          setError("We couldn't identify the subject in this image. Please try another image with a clear subject.");
        }
        else if (response.status === 402) {
          setError("No API credits are available right now.");
        }
        else if (response.status === 403) {
          setError("There is a problem with the API connection.");
        }
        else if (response.status === 429) {
          setError("Too many requests. Please try again later.");
        }
        else {
          setError("Something went wrong. Please try again.");
        }
        return;
      }

      const blob = await response.blob();
      console.log("blob se pehle");
      console.log(blob)
      console.log("blob ke baad")
      const urlImage = URL.createObjectURL(blob);
      console.log(urlImage)
      setResultImage(urlImage);
    } catch (error) {
      console.log(error)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false);
    }
  }

  //--------------//Preview-Image-Handling//----------------//

  const handleImageChange = (e) => {

    const file = e.target.files[0];

    setImage(file);
    setError("");
    setResultImage(null);

    if (file) {

      const previewUrl = URL.createObjectURL(file);

      setPreviewImage(previewUrl)
    }
  }

  return (
    <div>
      <Navbar />
      <div className='main-container'>
        <div className='Upload-container'>
          <img src={Star_Img} alt="" />
          <h1 className='Upload-text'>Upload an image to <br /> remove the background</h1>
          <button className='upload-image-button' onClick={() => fileInputRef.current.click()}>Upload Image</button>
          <input
            ref={fileInputRef}
            type="file"
            accept='image/*'
            onChange={handleImageChange}
            hidden
          />

          {(image || imageUrl) && !error && !resultImage && (
            <button
              className="remove-bg-btn"
              onClick={removeBackground}
              disabled={loading}
            >
              {
                loading ? "Processing..." : "Remove Background"
              }
            </button>
          )}
          {/* {error && (
          <p className="error-message">
            {error}
          </p>
        )}       */}

          {/* Loading State */}
          {/* {loading && <p>Processing...</p>} */}

          {/* Error Message */}
          {error && <p style={{ color: 'red', padding: '40px 0 0 0' }}>{error}</p>}

          {/* Image With Background Remove */}

          {/* {error && <p className="error-handle">{error}</p>} */}

          {(image || imageUrl) && (
            <div className="result-container">
              <h3>{resultImage ? "Background Removed:" : "Your Image"}</h3>

              <img
                src={resultImage || previewImage}
                alt="Result"
                className='result-image'
              />

              <br />
              {resultImage && (
                <a
                  href={resultImage}
                  download='no-bg-image.png'
                  className='download-btn btn-hover'
                >
                  Download  Image
                </a>
              )}
            </div>
          )}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <h4 className='drop-file'>or drop a file,</h4>
          </div>
          <p className='url url-link' onClick={clickHandle}>paste image or <span>URL</span></p>
          <div className='Theme-img'>
            <h4>No image? Try one of these:</h4>
            <div className='Theme-images'>
              <img src={Theme_img} alt="Theme-image_01"
                onClick={() => sampleImageHandle(Theme_img)}
              />
              <img src={Theme_img01} alt="Theme-image_02"
                onClick={() => sampleImageHandle(Theme_img01)}
              />
              <img src={Theme_img02} alt="Theme-image_03"
                onClick={() => sampleImageHandle(Theme_img02)}
              />
              <img src={Theme_img03} alt="Theme-image_04"
                onClick={() => sampleImageHandle(Theme_img03)}
              />
              <img src={Theme_img04} alt="Theme-image_05"
                onClick={() => sampleImageHandle(Theme_img04)}
              />
            </div>
            <div className='para'>
              <p>By uploading an image or URL you agree to our <a href='https://www.remove.bg/tos' target="_blank">Terms of Service.</a> To learn more about how remove.bg handles your personal data, check our <a href='https://www.remove.bg/privacy' target="_blank">Privacy Policy.</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Upload