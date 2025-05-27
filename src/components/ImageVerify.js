import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ImageVerify = () => {
  const navigate = useNavigate();

  const videoRef = useRef(null);

  const userData = localStorage.getItem("user-info");
  //console.log(userData)
  const userdetail = JSON.parse(userData);
  //alert(userdetail)
  const userId = userdetail.data.userdata.id;
  //const userId = 2
  //console.log(userId)

  // Assuming 'id' is a state variable
  const [id, setId] = useState(userId);
  //alert(id)

  useEffect(() => {
    const setupCamera = async () => {
      const video = videoRef.current;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    setupCamera();
  }, []);

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    var imageName = "user_" + id + "_check";
    //alert(imageName)

    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg")
    );
    const formData = new FormData();
    formData.append("image", blob, imageName + ".jpg");

    fetch(`https://api.amaanatmedical.com/api/users/imageupload2/${id}`, {
      method: "POST",
      body: formData,
    });

    const response = fetch(
      `https://api.amaanatmedical.com/api/users/verification/${id}`,
      {
        method: "GET",
      }
    );

    response
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        const userFound = data["user found"];

        if (userFound === true) {
          navigate("/verify");
        } else {
          navigate("/logout");
        }
        //console.log(unknownFaces)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <video
        id="video"
        ref={videoRef}
        autoPlay
        playsInline
        muted
        width="400"
      ></video>

      <button
        id="captureBtn"
        onClick={captureImage}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "none",
          outline: "none",
          marginTop: "2em",
          backgroundColor: "#03045e",
          color: "#fff",
          padding: "1em",
          borderRadius: "8px",
          marginBottom: "2em",
          cursor: "pointer",
        }}
      >
        Verify Image{" "}
      </button>
    </div>
  );
};

export { ImageVerify };
