import React, { useEffect, useState } from "react";
//import api from "../api/axiosInstance";
//import Confirm from "../components/popUps/Confirm";
//import DeleteModal from "../components/popUps/DeleteModal";
//import useSearch from "../utils/useSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDropletSlash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { testUsers } from "../../constants/testUsers";


const UsersList = ({openDashboard}) => {
  /*  test data */
  const [filteredData, setFilteredData] = useState(testUsers);

  /* action button */
  const [actionBtn, setActionBtn] = useState(false)

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  //setting up feedback message using a popUp
      const [showModal, setShowModal] = useState(false);
      const [user_ID, setUser_ID] = useState("");

  //fetching users
     const fetchUsers = async () => {
      try {
   /*      const res = await api.get("http://localhost:5000/api/users");
        setUsers(res.data); */
        setLoading(false);

      } catch (err) {
        console.error("Error fetching users:", err);
        setLoading(false);
      }
    };
 
  //Making user an admin
     const makeAdmin = async (id) => {
      //const token = localStorage.getItem("accessToken");
    
   /*    try {
        const res = await api.patch(
          `http://localhost:5000/api/users/make-admin/${id}`,
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
      } */
  };  

//handle confirm sets given ID to a state variable
    const handleConfirm=(userId)=>{
      setUser_ID(userId);
    }

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

 // Reusable search hook. This is all we need for our users, search
 // const { query, setQuery, filteredData } = useSearch(users, ["username", "email"]);

  if (loading) return <p>Loading users...</p>;

  return (
  <div>
  {/* This si the db Header. It is different across all lists due to search and order of items */}
      <div className="bg-bg flex-row-center justify-between pl-8 pr-4 h-14">
            <div className="nameOfContentDisplayed">
               <h3>All Users</h3>
            </div>

          {/*  sort bar */}
            <div className="w-fit h-full flex-row-center">
              <p className="mr-3"> Sort by</p>
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
                /*   value={query}
                  onChange={(e) => setQuery(e.target.value)} */
                />
            </div>

          {/* export bar */}
            <div className="w-fit h-full flex-row-center">
              <button className="bg-primary-light cursor-pointer hover:shadow-2xl hover:shadow-primary duration-300 text-bg w-20 h-9.5 rounded-lg text-sm"> Export </button>
            </div>
      </div>
    
<div className={`w-full pl-8 not-odd:overflow-y-scroll ${openDashboard ? "h-[44vh]" : "h-[68vh]"}`}>
      <table  className="w-full mt-4 text-left leading-9 tracking-wide dataTable">
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
              <td className="">
                <p onClick={()=>setActionBtn(!actionBtn)} className="cursor-pointer">...</p> <FontAwesomeIcon icon={faDropletSlash}/>
                  <ul className={`${actionBtn ? "block": "hidden"}`}> 
                   {/*  This opens the confirm popUp  */}
                    <li onClick={()=>{setShowModal(true); handleConfirm(user.id);}}>delete</li>
                    <li><button
                          onClick={() => makeAdmin(user.id)}
                          disabled={user.role === "admin"}
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
      {/*  {filteredData.length===0 ? <p className="emptyTable">No Users found!</p> : ""} */}
    </div>

{/*  Displaying the response messsage using a popUP. This is when deleting or updating within  the list */}
{/*        <DeleteModal isOpen={showModal}  fetchData={()=>fetchUsers()} onCloseConfirm={() => onCloseConfirm()} onClose={() => {
              setShowModal(false); 
          }}>
          <Confirm onCloseConfirm={() => onCloseConfirm()}
                   deleteUrl={`http://localhost:5000/api/users/${user_ID}`}
                   deleteName="user"
                   fetchData={()=>fetchUsers()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </Confirm>
      </DeleteModal> */}
    </div>
  );
};


export default UsersList;
