import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ImageUpload = () => {

  const navigate = useNavigate()

  const videoRef = useRef(null);
  const userData = localStorage.getItem('user-info');
  const userdetail = JSON.parse(userData);
  const userId = userdetail?.data?.userdata?.id || '';

  const [id, setId] = useState(userId);

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

  useEffect(() => {
    // Set up an interval that triggers every 5 seconds
    const intervalId = setInterval(() => {
      captureImage();
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [id]); // Include 'id' in the dependency array to capture changes

  const captureImage = async () => {

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var imageName = 'user_' + id + '_check';
    //alert(imageName);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
    const formData = new FormData();
    formData.append('image', blob, imageName + '.jpg');

    fetch(`https://api.amaanatmedical.com/api/users/imageupload2/${id}`, {
      method: 'POST',
      body: formData,
    });

    const response = fetch(`https://api.amaanatmedical.com/api/users/verification/${id}`, {
      method: 'GET',
    });

    // Assuming response is a Promise
    response.then(res => {

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();

    }).then(data => {

      console.log(data); // This will log the JSON response
      const unknownFaces = data["unknown faces"];

      if (unknownFaces > 0) {
        navigate('/logout')
      }
      console.log(unknownFaces)

    }).catch(error => {
      console.error('Error:', error);

    });

  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <video id="video" ref={videoRef} autoPlay playsInline muted width="400"></video>
    </div>
  );
};

export { ImageUpload };
