import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import DeleteModal from "../components/modals/DeleteModal";
import useSearch from "../utils/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import exportToCSV from "../utils/exportToCSV";
import { BASE_URL } from "../api/api";
import DeleteConfirm from "../components/modals/DeleteConfirm";
import AuthModal from "../components/modals/AuthModal";
import Alert from "../components/modals/Alert";
import LoadingModal from "../components/modals/LoadingModal";

const MessagesList = () => {
  const [messages, setMessages] = useState([]);

//loading state
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

//Setting up our feedback modal
  const[responseMessage, setResponseMessage] = useState("");

//setting up feedback message using a popUp
  const [showModal, setShowModal] = useState(false);
  const [message_ID, setMessage_ID] = useState("");

//now fetching messages
  const fetchMessages = async () => {
    //initialize loading
     setIsLoading(true)
       
      try {
        const res = await api.get(`/messages`);
        setMessages(res.data);

      } catch (err) {
        console.error("Error fetching messages:", err);

      }finally {
        setIsLoading(false); // unlock UI
      }
    };

//handle confirm sets given ID to a state variable
    const handleConfirm=(messageId)=>{
      setMessage_ID(messageId);
    }

//handles hidding the confirm MODAL
    const onCloseConfirm=() => {setShowModal(false);}
  
/* The data refresher when the tab is still open and a change is made */
  useEffect(() => {
          fetchMessages(); // Initial load

  // Set up listener
    const handleListChange = () => {
        fetchMessages(); // Re-fetch users
    };

    window.addEventListener("listChange", handleListChange);

  // Clean up
    return () => {
      window.removeEventListener("listChange", handleListChange);
    };
  }, []);

  // Reusable search hook. Search messages
   const { query, setQuery, filteredData } = useSearch(messages, ["username", "email"]);

   // Show modal only when responseMessage changes and is not empty
   useEffect(() => {
    if (responseMessage) {
        setShowModal(true);
    }
  }, [responseMessage]);


 /*  Exporting messages to CSV */
   const handleExportMessages = () => {
      exportToCSV(messages, {
        filename: "messages.csv",
        columns: [
            { key: "username", label: "Username" },
            { key: "email", label: "Email" },
            { key: "phone", label: "Phone" },
            { key: "message", label: "Message" },
            { key: "created_at", label: "Date/time" },
        ],
      });
    }

  return (
    <div>
    
    {/* This si the db Header. It is different across all lists due to search and order of items */}
    <div className="dbContentHeader">
            <div className="nameOfContentDisplayed">
               <h3>Messages</h3>
            </div>
            <div className="sortBy">
              <p> Sort by</p>
              <select name="nameOfContent" id="nameOfContent">
                    <option value="Latest selected">Latest</option>
                    <option value="Oldest">Oldest</option>
                    <option value="Frequent">Frequent</option>
              </select>
            </div>
            <div className="searchBar">
              <FontAwesomeIcon icon={faSearch} className="search-icon"></FontAwesomeIcon>
                <input
                  type="text"
                  placeholder="username or email"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            {/* export bar */}
            <div className="w-fit h-full flex-row-center">
              <button 
              onClick={handleExportMessages}
              className="bg-primary-light cursor-pointer hover:shadow-2xl hover:shadow-primary duration-300 text-bg w-20 h-9.5 rounded-lg text-sm"> Export </button>
            </div>
      </div>
  
  <div className="admin-section">
      <table className="admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Message</th>
            <th>Submitted</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((msg, idx) => (
          <tr key={msg.id}>
              <td>{idx + 1}</td>
              <td>{msg.username}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.created_at).toLocaleString()}</td>
              <td className="actionBtn">
                  <p> ...</p>
                  <ul className="actionList">
                    <li onClick={()=>{setShowModal(true); handleConfirm(msg.id);}}>delete</li>
                    <li>block</li>
                  </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* response message if the table is empty or failed to retrieve */}
      {filteredData.length===0 ? <p className="emptyTable">No Messages found!</p> : ""}

  </div>

{/*  Displaying the response messsage using a popUP. This is when deleting or updating within  the list */}
      <DeleteModal isOpen={showModal}  fetchData={()=>fetchMessages()} onCloseConfirm={() => onCloseConfirm()} onClose={() => {
              setShowModal(false); 
          }}>
          <DeleteConfirm onCloseConfirm={() => onCloseConfirm()}
                   deleteUrl={`${BASE_URL}/api/messages/${message_ID}`}
                   deleteName="Message"
                   fetchData={()=>fetchMessages()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </DeleteConfirm>
      </DeleteModal>


      {/*  Displaying feedback message */}
      <AuthModal isOpen={showAlert} onClose={() => {
                      setShowAlert(false); 
                      setResponseMessage("");//reset so that to trigger useEffect
                  }}>

                  <Alert onClose={() => {
                      setShowAlert(false); 
                      setResponseMessage("");
                  }}
                  >
                      <p className="responseMessage">{responseMessage}</p>
                  </Alert>
              </AuthModal>

        {/*  Displaying the loading modal */}
                <AuthModal isOpen={isLoading} onClose={() => {}}>
                  <LoadingModal
                   text="Retrieving Messages..."
                   subText="Please wait while data is securely loaded" 
                  />
                </AuthModal>
</div>
  );
};

export default MessagesList;
