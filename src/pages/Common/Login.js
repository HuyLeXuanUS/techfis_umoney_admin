import { sessionVar, path, allowedRoles } from "../../utils/constants";
import { setSessionVar } from "../../utils/common/hashData";
import { useNavigate, useLocation } from "react-router-dom";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { notification } from "antd";

import logoFill from "../../assets/images/logoFill.png";

import { apiLogin } from "../../services/network/auth_api";
import CryptoJS from "crypto-js";

import "./styles.css";


const LoginWithRequireLogin = ({ onSetUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectCallBack = location.state?.redirectCallBack
    ? location.state?.redirectCallBack
    : undefined;

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const [api] = notification.useNotification();


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleShowNotification = (type, message, description) => {
    api[type]({
      message: message,
      description: description,
    });
  };

  const handleFetchData = () => {
    const secretKey = "U2FsdGVkX19mYN5Z5e9jPINp5k";
    const token = "This is a token";
    const encryptedToken = CryptoJS.AES.encrypt(
      token,
      secretKey
    ).toString();

    console.log("Encrypted Token:", encryptedToken);

    const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    console.log("Decrypted Token:", decryptedToken);
  };

  const handleSubmit = async () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    }

    const res = await apiLogin({
      email: email,
      password: password,
    });

    if (res && res.data) {
      console.log("Response:", res.data);
      const { accessToken } = res.data;

      if (accessToken) {
        setSessionVar(sessionVar.user, { role: allowedRoles[2] });
        onSetUser({ role: allowedRoles[2] });
        navigate("../" + path.private.Transaction);
      } else {
        newErrors.email = "Email or password is incorrect! Please try again.";
      }
    } else {
      newErrors.email = "Email or password is incorrect! Please try again.";
    }

    setErrors(newErrors);
  };

  const handleForgotPassword = () => {
    //console.log('Forgot password clicked');
  };

  return (

    <div className="flex flex-col h-fit">
      <header className="relative z-2 flex items-center h-fit w-full bg-[#6DA4DA]">
        <img
          className="h-[50px] md:h-[50px] lg:h-[75px] object-contain w-auto cursor-pointer"
          src={logoFill}
          alt="LogoFill"
        />
      </header>

      {/* {Text Login to Umoney Adimin} */}
      <div className="flex flex-col items-center justify-center pt-[2vw] px-[4vw]">
        <h1 className="text-center font-bold text-[#6DA4DA]">
          <span className="text-base md:text-lg lg:text-xl text-black mr-8 font-roboto">
            Login to
          </span>{" "}
          <span className="text-3xl md:text-4xl lg:text-5xl font-roboto">
            Umoney Admin
          </span>
        </h1>
      </div>

      <div className="flex justify-center items-center p-[4vw]">
        <div className="container p-8 w-full max-w-md">
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Your email address
            </label>
            <input
              type="email"
              id="email"
              className="input border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#6DA4DA]"
              value={email}
              onChange={handleChangeEmail}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Your password
            </label>
            <div className="relative h-fit w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="input border border-gray-300 rounded-md w-full p-3 focus:outline-none focus:ring-2 focus:ring-[#6DA4DA]"
                value={password}
                onChange={handleChangePassword}
              />

              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute h-[100%] right-5 text-gray-500 w-fit"
              >
                {showPassword ? (
                  <FaEyeSlash className="w-5 h-5" />
                ) : (
                  <FaEye className="w-5 h-5" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password}
              </p>
            )}
          </div>

          <div className="py-4">
            <button
              className="text-left text-[#6DA4DA] hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot password
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#6DA4DA] text-white p-3 rounded-md hover:bg-[#5B8DC2] transition-colors duration-300"
            onClick={handleSubmit}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginWithRequireLogin;
