import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import DeleteModal from "../components/modals/DeleteModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import exportToCSV from "../utils/exportToCSV";
import useSearch from "../utils/useSearch";
import { BASE_URL } from "../api/api";
import LoadingModal from "../components/modals/LoadingModal";
import AuthModal from "../components/modals/AuthModal";
import DeleteConfirm from "../components/modals/DeleteConfirm";

const UsersList = ({openDashboard}) => {
  //loading state
    const [isLoading, setIsLoading] = useState(false);
 /* action button */
    const [openActionId, setOpenActionId] = useState(null);
    const [users, setUsers] = useState([]);

  //setting up feedback message using a popUp
    const [showModal, setShowModal] = useState(false);
    const [user_ID, setUser_ID] = useState("");

  //admin count to prevent deleting all admins
    const adminCount = users.filter(u => u.role === "admin").length;


  //Action button ToggleEvent
   const toggleActions = (id) => {
    setOpenActionId(prev => (prev === id ? null : id));
  };
  

  //fetching users
   const fetchUsers = async () => {
      //show loading modal
      setIsLoading(true)

      try {
     const res = await api.get(`${BASE_URL}/api/users`);
        setUsers(res.data);

      } catch (err) {
        console.error("Error fetching users:", err);
      }finally {
        setIsLoading(false); // unlock UI
      }
    };
 
  //Making user an admin
     const makeAdmin = async (id) => {
     const token = localStorage.getItem("accessToken");
     try {
        const res = await api.patch(
          `${BASE_URL}/api/users/make-admin/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          }
        );
        alert(res.data.message);
      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Failed to promote user");
      }
  };  

//This handles closing of confirm Modal
    const onCloseConfirm=() => {setShowModal(false);}
 
/* The data refresher when the tab is still open and a change is made */
    useEffect(() => {
      // Initial load
        fetchUsers(); 
    
      // Set up listener
        const handleListChange = () => {
          fetchUsers(); // Re-fetch users
        };
    
        window.addEventListener("listChange", handleListChange);
    
      // Clean up
        return () => {
          window.removeEventListener("listChange", handleListChange);
        };
      }, []);

 // Reusable search hook.
    const { query, setQuery, filteredData } = useSearch(users, ["username", "email"]);


 /* Handle export to CSV file */
      const handleExportUsers = () => {
        exportToCSV(filteredData, {
          filename: "users.csv",
          columns: [
            { key: "id", label: "ID" },
            { key: "username", label: "Username" },
            { key: "email", label: "Email" },
            { key: "role", label: "Role" },
          ],
        });
      };

  return (
  <div>
  {/* This si the db Header. It is different across all lists due to search and order of items */}
      <div className="w-[98%] m-auto rounded-xl bg-bg flex-row-center justify-between pl-8 pr-4 h-14">
            <div className="nameOfContentDisplayed">
               <h3>All Users</h3>
            </div>

          {/*  sort bar */}
            <div className="w-fit h-full flex-row-center">
              <p className="mr-3"> Sort by </p>
              <select name="nameOfContent" id="nameOfContent" className="bg-bg-light h-2/3 w-30 outline-0">
                    <option value="Latest selected">Latest</option>
                    <option value="Oldest">Oldest</option>
              </select>
            </div>

           {/*  search bar */}
            <div className="bg-bg-light h-3/4 flex-row-center gap-2 rounded-2xl pl-4">
                <FontAwesomeIcon icon={faSearch} className="search-icon"></FontAwesomeIcon>
                <input
                  className="outline-0"
                  type="text"
                  placeholder="username or email"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
            </div>

          {/* export bar */}
            <div className="w-fit h-full flex-row-center">
              <button 
              onClick={handleExportUsers}
              className="bg-primary-light cursor-pointer hover:shadow-2xl hover:shadow-primary duration-300 text-bg w-20 h-9.5 rounded-lg text-sm"> Export </button>
            </div>
      </div>
    
    <div className={`w-full pl-8 not-odd:overflow-y-scroll ${openDashboard ? "h-[43vh]" : "h-[66vh]"}`}>
      <table  className="w-full mt-4 text-left leading-12 tracking-wide dataTable">
        <thead>
          <tr>
            <th>Index</th>
            <th>Username</th>
            <th>Email</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td className="relative">
                    <p className="cursor-pointer  text-lg" onClick={() => toggleActions(user.id)}>
                      ⋮
                    </p>
                    <ul className={`absolute right-0 mt-2 z-10 w-34 bg-bg-dark shadow-lg rounded-md border border-gray-200 2-50 p-1 ${openActionId === user.id ? "block" : "hidden"}`}>
                      <li onClick={() => {
                          setShowModal(true);
                          setUser_ID(user.id);
                          setOpenActionId(null);
                        }}
                        className="px-4 py-2 hover:bg-red-50 cursor-pointer text-red-500 text-sm"
                      >
                         Delete
                      </li>

                      <li className="">
                        <button onClick={() => {
                            makeAdmin(user.id);
                            setOpenActionId(null);
                          }}
                          disabled={user.role === "admin"}
                          className="px-4 py-2 w-full text-left disabled:text-gray-400 text-sm bg-bg-dark hover:bg-bg-light"
                        >
                          Make Admin
                        </button>
                      </li>
                    </ul>
                  </td>
            </tr>
          ))} 
        </tbody>
      </table>

      {/* response message if the table is empty or failed to retrieve */}
      {filteredData.length===0 ? <p className="emptyTable">No Users found!</p> : ""}
    </div>

{/* Displaying the response messsage using a popUP. This is when deleting or updating within  the list */}
      <DeleteModal isOpen={showModal}  fetchData={()=>fetchUsers()} onCloseConfirm={() => onCloseConfirm()} onClose={() => {
              setShowModal(false); 
          }}>
          <DeleteConfirm onCloseConfirm={() => onCloseConfirm()}
                   deleteUrl={`${BASE_URL}/api/users/${user_ID}`}
                   deleteName="user"
                   fetchData={()=>fetchUsers()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </DeleteConfirm>
      </DeleteModal>


{/*  Displaying the loading modal */}
        <AuthModal isOpen={isLoading} onClose={() => {}}>
            <LoadingModal
               text="Retrieving user records..."
               subText="Please wait while data is securely loaded"               
            />
        </AuthModal>
    </div>
  );
};


export default UsersList;
