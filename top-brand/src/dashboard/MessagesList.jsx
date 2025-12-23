import React, { useEffect, useState } from "react";
//import api from "../api/axiosInstance";
//import DeleteModal from "../components/popUps/DeleteModal";
//import Confirm from "../components/popUps/Confirm";
//import useSearch from "../utils/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


const MessagesList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

//setting up feedback message using a popUp
  const [showModal, setShowModal] = useState(false);
  const [message_ID, setMessage_ID] = useState("");

//now fetching messages
    /* const fetchMessages = async () => {
      try {
        const res = await api.get("http://localhost:5000/api/messages");
        setMessages(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching messages:", err);
        setLoading(false);
      }
    };
 */
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
  }, [messages]);

  // Reusable search hook. Search messages
   const { query, setQuery, filteredData } = useSearch(messages, ["username", "email"]);

  if (loading) return <p>Loading messages...</p>;

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
          <Confirm onCloseConfirm={() => onCloseConfirm()}
                   deleteUrl={`http://localhost:5000/api/messages/${message_ID}`}
                   deleteName="Message"
                   fetchData={()=>fetchMessages()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </Confirm>
      </DeleteModal>
</div>
  );
};

export default MessagesList;
