import React, { useState, useEffect } from "react";
import Alert from "../components/modals/Alert";
import axios from "axios";
import AuthModal from "../components/modals/AuthModal";

const ForgotPassword = ({closeForgotPass}) => {
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  //setting up a simple modal to show our response message nicely
  const[showModal, setShowModal] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        {
          email: email.trim().toLowerCase(), //sending 'email' key
        }
      );
      setResponseMessage(response.data.message);
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "Something went wrong. Please try again later");
    }
  };

  // Show modal only when responseMessage changes and is not empty
  useEffect(() => {
    if (responseMessage) {
      setShowModal(true);
    }
  }, [responseMessage]);

  return (
    <>
      <div className="bg-bg-light h-130 w-80 sm:w-90 rounded-lg p-6">
          {/* Header */}
            <div className="w-full flex-row-center justify-between mb-16">
              <h2 className='text-2xl font-semibold'>OOPS!</h2>
              <button onClick={closeForgotPass} className="bg-bg-dark w-6 h-6 rounded-full cursor-pointer hover:opacity-45">✕</button>
            </div>

            <h2 className='text-2xl pl-3 mb-4'>Let's resolve this!</h2>

            <p className="pl-4">Enter your email</p>
          {/* SignIn Form */}
            <form onSubmit={handleReset} className='h-40 flex-col-start justify-evenly p-4 '>
                  <div className="bg-bg w-full">
                    <input
                      className='outline-gray-200 bg-bg w-full p-2 text-sm tracking-wide'
                      type="email"
                      name="email"
                      size="35"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete='on'
                      maxLength="40"
                      required
                    />
                  </div>
              
                  <button type="submit" className="w-full p-2 bg-accent green-shadow cursor-pointer mt-6 text-bg-light">Reset Password</button>
            </form>    
       </div>
      
  {/*  Displaying the response messsage using a popUP */}
        <AuthModal isOpen={showModal} onClose={() => {
                setShowModal(false); 
                setResponseMessage("");//reset so that to trigger useEffect on the second time
            }}>

            <Alert onClose={() => {
                setShowModal(false); 
                setResponseMessage("");
            }}
            >
                <p className="responseMessage">{responseMessage}</p>
            </Alert>
        </AuthModal>
  </>
  );
};

export default ForgotPassword;
