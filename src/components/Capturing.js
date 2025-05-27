import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const ImageCapture = () => {

  const navigate = useNavigate()
  
  const videoRef = useRef(null);

  const userData = localStorage.getItem('signup-id')
  //console.log(userData)
  const userdetail = JSON.parse(userData)
  const userId = userdetail.data.id

    // Assuming 'id' is a state variable
    const [id, setId] = useState(userId);
    console.log(id)

  useEffect(() => {

    const setupCamera = async () => {
      const video = videoRef.current;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    setupCamera();
  }, []);

  const captureImage = async () => {

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var imageName = 'user_' + id;
    //alert(imageName);
    alert("image captured");
        
    navigate('/login')

    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg'));
    const formData = new FormData();
    formData.append('image', blob, imageName + '.jpg');

    fetch(`http://api.amaanatmedical.com/api/users/imageupload/${id}`, {
      method: "POST",
      body: formData,
    });
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>

      <video id="video" ref={videoRef} autoPlay playsInline muted width="400"></video>

      <button id="captureBtn" 
        onClick={captureImage} 
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
                border: 'none', outline: 'none', marginTop: '2em', 
                backgroundColor: '#03045e', color: '#fff', padding: '1em', 
                borderRadius: '8px', marginBottom: '2em', cursor: 'pointer'
        }}
      >
        Capture Image</button>
    </div>
  );
};

export {ImageCapture};
