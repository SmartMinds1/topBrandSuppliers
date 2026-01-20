import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/modals/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AuthModal from '../components/modals/AuthModal';
import { BASE_URL } from "../api/api";
import LoadingModal from '../components/modals/LoadingModal';


const SignIn = ({signUpResponse, closeSignIn, onDontHaveAccount, onForgotPass}) => {
//loading state
const [isLoading, setIsLoading] = useState(false);

//setting up the initial states ot the form
  const [formData, setFormData] = useState({
      username:"",
      password:""
      });

//for page navigation to protected page after successfull singIn
  const navigate = useNavigate();

//Setting up our feedback popUp
  const [showModal, setShowModal] = useState(false);
  const[responseMessage, setResponseMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);


//sets the data from the field to the given variables
  const handleChange =(e)=>{
    setFormData({...formData, [e.target.name] : e.target.value });
  }

//sending data to the db
  const handleSubmit = async(e)=>{
   //preventing default form submition
        e.preventDefault();
        console.log("submitting Sign In Details", formData);

    //show loading state
      setIsLoading(true);
      setShowModal(false); 
      setResponseMessage("");

    // Normalize username before sending
        const normalizedFormData = {
          ...formData,
          username: formData.username.toLowerCase().trim(),
        };

        try{
              const response = await axios.post(`${BASE_URL}/api/auth/login`, normalizedFormData,  { withCredentials: true })
          //set up this credentials in local storage
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("userRole", response.data.role);
              localStorage.setItem("username", response.data.username);

              setResponseMessage(response.data.message);
              setFormData({
                username:"",
                password:"",
          });//resetting the input fields


         //Determine the role of the loged in user and direct them to the right dashboard     
         const role = localStorage.getItem("userRole");
         if (role === "admin" || role === "agent") {
           navigate("/admin");
         } else {
              window.location.reload();
         }
         
              
        }catch(error){
          setResponseMessage(
            error.response?.data?.message || <p className='loginFailed'><span>Login failed!</span> Please try again</p> 
        );

        }finally {
          setIsLoading(false); // unlock UI
     }

  }

// Show modal only when responseMessage changes and is not empty
      useEffect(() => {
          if (responseMessage) {
              setShowModal(true);
          }
        }, [responseMessage]);


  return (
    <div>
      <div className="bg-bg-light h-110 sm:h-130 w-80 sm:w-90 rounded-lg p-6">
        {/* Header */}
          <div className="w-full flex-row-center justify-between mb-8">
            <div> {signUpResponse ? <h2> <span className=' text-green-600 text-xl'>{signUpResponse}</span> <br /> <span className='text-text'>Proceed to log in</span></h2> : <h2 className='text-xl'>Welcome Back!</h2> }</div>
            <button onClick={closeSignIn} className="bg-bg-dark w-6 h-6 rounded-full cursor-pointer hover:opacity-45">✕</button>
          </div>

        {/* SignIn Form */}
        <form onSubmit={handleSubmit} className='h-68 flex-col-start justify-evenly p-4'>
              <div className="bg-bg w-full tracking-wide">
                <input
                  className='outline-gray-200 bg-bg w-full p-2 text-sm'
                  type="text"
                  name="username"
                  placeholder="Username"
                  size="35"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete='on'
                  maxLength="20"
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
          
              <button type="submit" className="w-full p-2 bg-accent green-shadow cursor-pointer mt-6 text-bg-light">Sign In</button>
        </form>

        <p className="text-text w-full text-center">Don't have an account? <span onClick={() => onDontHaveAccount()} className='text-primary cursor-pointer hover:opacity-65'>sign up</span></p>
         
        <div className="w-full">
              <p onClick={() => onForgotPass()} className="w-full text-accent cursor-pointer hover:opacity-80 text-sm pt-1 text-right underline"> Forgot Password?</p>
        </div>   
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

        {/*  Displaying the loading modal */}
                <AuthModal isOpen={isLoading} onClose={() => {}}>
                  <LoadingModal
                     text="Signing you in..."
                     subText="Verifying your credentials"
                  />
                </AuthModal>

    </div>
  );
};

export default SignIn;
