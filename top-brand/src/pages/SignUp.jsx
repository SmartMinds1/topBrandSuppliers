import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuthModal from '../components/modals/AuthModal';
import Alert from '../components/modals/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from "../api/api";
import LoadingModal from '../components/modals/LoadingModal';

const SignUp = ({ closeSignUp, onSuccess }) => {
 //loading state
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

//signUP modal and response message
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting SignUp Details", formData);
  
  //show loading state
     setIsLoading(true);
     setShowModal(false); 
     setResponseMessage("");

  // Normalize email before sending
    const normalizedFormData = {
      ...formData,
      email: formData.email.trim().toLowerCase(), username: formData.username.trim().toLowerCase(),
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, normalizedFormData);
      setResponseMessage(response.data.message);
      setFormData({
        username: "",
        email: "",
        password: "",
      });

   // Mark success to trigger the next phase. Onsuccess if a function that will manage clossing of signUp and opening of SingIn
      onSuccess(response.data.message);


    } catch (error) {
      //Use specific message from backend if available
      setResponseMessage(error.response?.data?.message || "Registration failed. Please try again.");
    }finally {
      setIsLoading(false); // unlock UI
    }
  };

  //Only show modal if the response message Exists
  useEffect(() => {
    if (responseMessage) {
      setShowModal(true);
    }
  }, [responseMessage]);

  

  return (
    <>
      <div className="bg-bg-light h-110 sm:h-130 w-80 sm:w-90 rounded-lg p-6">
        {/* Header */}
        <div className="w-full flex-row-center justify-between mb-8">
          <h2 className='text-2xl'>Welcome!</h2>
          <button onClick={closeSignUp} className="bg-bg-dark w-6 h-6 rounded-full cursor-pointer hover:opacity-45">✕</button>
        </div>

        {/* SignUp Form */}
        <form onSubmit={handleSubmit} className='h-68 flex-col-start justify-evenly p-4'>
          <div className="bg-bg w-full">
            <input
              className='outline-gray-200 bg-bg w-full p-2 text-sm tracking-wide'
              type='text'
              autoComplete='on'
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              maxLength="30"
              required
            />
          </div>

          <div className="bg-bg w-full">
            <input
              className='outline-gray-200 bg-bg w-full p-2 text-sm tracking-wide'
              type="email"
              name="email"
              size="35"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete='on'
              maxLength="40"
              required
            />
          </div>

          <div className="bg-bg flex-row-center pr-2 w-full">
            <input
              className='outline-gray-200 bg-bg w-full p-2 mr-2 text-sm tracking-wide'
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete='off'
              maxLength="20"
              required
            />
            <span onClick={() => setShowPassword(prev => !prev)}>
                 <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>

          <button type="submit" className="w-full p-2 bg-accent green-shadow cursor-pointer mt-6 text-bg-light">Sign Up</button>
        </form>

        <p className="text-text w-full text-center">Already have an account? <span onClick={()=>onSuccess()} className='text-primary cursor-pointer hover:opacity-65'>sign in</span></p>
      </div>

{/*  Displaying the response messsage using a popUP */}
      <AuthModal isOpen={showModal} onClose={() => {
        setShowModal(false);
        setResponseMessage("");
      }}>
          <Alert onClose={() => {
            setShowModal(false);
            setResponseMessage("");
          }}>
            <p className="">{responseMessage}</p>
          </Alert>
      </AuthModal>

 {/*  Displaying the loading modal */}
      <AuthModal isOpen={isLoading} onClose={() => {}}>
        <LoadingModal
           text="Creating your account..."
           subText="Setting things up for you, please wait"           
        />
      </AuthModal>    

    </>
  );
};

export default SignUp;
