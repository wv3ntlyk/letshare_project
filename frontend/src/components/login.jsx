import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const fetchUserProfile = async (accessToken) => {
    return await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((response) => response.json());
  };

  const handleSuccessfulLogin = async (response) => {
    const { access_token } = response; // Destructure access token
    const profileData = await fetchUserProfile(access_token);
    const googleId = profileData.id;
    console.log(googleId);
    const imageUrl = profileData.picture; // Assuming imageUrl is available
    const name = profileData.name;

    localStorage.setItem("user", JSON.stringify(profileData));

    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  const signIn = useGoogleLogin({
    clientId: `${process.env.REACT_APP_GOOGLE_API_TOKEN}`,
    onSuccess: handleSuccessfulLogin,
    onError: handleSuccessfulLogin,
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" />
          </div>

          <div className="shadow-2xl">
            <button
              type="button"
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
              onClick={signIn}
            >
              <FcGoogle className="mr-4" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
