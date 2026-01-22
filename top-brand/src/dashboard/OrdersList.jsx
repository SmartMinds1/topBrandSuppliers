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
import StatusOption from "./StatusOption";

const UsersList = ({openDashboard}) => {
  //loading state
    const [isLoading, setIsLoading] = useState(false);

 // action button 
    const [openActionId, setOpenActionId] = useState(null);
    const [oders, setOrders] = useState([]);
    const [order_ID, setOrder_ID] = useState("");
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    
  //setting up feedback message using a modal
    const [showModal, setShowModal] = useState(false);

  //status update modal  
    const [statusUpdate, setStatusUpdate] = useState(false);

  //Action button ToggleEvent
   const toggleActions = (id) => {
    setOpenActionId(prev => (prev === id ? null : id));
  };
  //to expand order and view list items
  const toggleExpand = (id) => {
    setExpandedOrderId(prev => (prev === id ? null : id));
  };
  
  

    //fetching ORDERS
      const fetchOrders = async () => {
    //show loading modal
      setIsLoading(true)

      try {
        const res = await api.get(`${BASE_URL}/api/orders`);
        setOrders(res.data);

      }catch (err) {
        console.error("Error fetching orders:", err);

      }finally {
        setIsLoading(false); // unlock UI
      }
    };  

//This handles closing of confirm Modal
    const onCloseConfirm=() => {setShowModal(false);}
 
/* The data refresher when the tab is still open and a change is made */
    useEffect(() => {
      // Initial load
        fetchOrders(); 
    
      // Set up listener
        const handleListChange = () => {
          fetchOrders(); // Re-fetch orders
        };
    
        window.addEventListener("listChange", handleListChange);
    
      // Clean up
        return () => {
          window.removeEventListener("listChange", handleListChange);
        };
      }, []);

 // Reusable search hook.
    const { query, setQuery, filteredData } = useSearch(oders, ["status"]);


 /* Handle export to CSV file */
      const handleExportOrders = () => {
        exportToCSV(filteredData, {
          filename: "orders.csv",
          columns: [
            { key: "id", label: "order id" },
            { key: "user_id", label: "User id" },
            { key: "status", label: "status" },
            { key: "total_amount", label: "total amount" },
            { key: "created_at", label: "Date/time" },
          ],
        });
      };

  return (
  <div>
  {/* This is the db table Header.*/}
      <div className="w-[98%] m-auto rounded-xl bg-bg flex-row-center justify-between pl-8 pr-4 h-14">
            <div className="nameOfContentDisplayed">
               <h3>All Orders</h3>
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
              onClick={handleExportOrders}
              className="bg-primary-light cursor-pointer hover:shadow-2xl hover:shadow-primary duration-300 text-bg w-20 h-9.5 rounded-lg text-sm"> Export </button>
            </div>
      </div>
    
    <div className={`w-full pl-8 not-odd:overflow-y-scroll ${openDashboard ? "h-[43vh]" : "h-[66vh]"}`}>
      <table  className="w-full mt-4 text-left leading-12 tracking-wide dataTable">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>User id</th>
            <th>total_amount</th>
            <th>status</th>
            <th>created at</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((order) => (
            <React.Fragment key={order.id}>
                {/* ORDER ROW */}
                <tr key={order.id}>
                  <td>{order.order_code}</td>
                  <td>{order.user_id}</td>
                  <td>{order.total_amount}</td>
                  <td>{order.status}</td>
                  <td>{new Date(order.created_at).toLocaleString()}</td>
                  <td className="relative">
                        <p className="cursor-pointer  text-lg" onClick={() => toggleActions(order.id)}>
                          ⋮
                        </p>
                        <ul className={`absolute right-0 mt-2 z-10 w-34 bg-bg-dark shadow-lg rounded-md border border-gray-200 2-50 p-1 ${openActionId === order.id ? "block" : "hidden"}`}>

                          <li onClick={() => {
                              setStatusUpdate(true);
                              setOrder_ID(order.id);
                              setOpenActionId(null);
                            }}
                            className="px-4 py-2 hover:bg-red-50 cursor-pointer text-red-500 text-sm"
                          >
                            update status
                          </li>

                          <li onClick={() => { toggleExpand(order.id); setOpenActionId(null);}} > view items</li>

                          <li onClick={() => {
                              setShowModal(true);
                              setOrder_ID(order.id);
                              setOpenActionId(null);
                            }}
                            className="px-4 py-2 hover:bg-red-50 cursor-pointer text-red-500 text-sm"
                          >
                            Delete
                          </li>
                        </ul>
                      </td>
                </tr>

                {/* ITEMS ROW */}
                {expandedOrderId === order.id && (
                <tr>
                  <td colSpan="6">
                    <table className="w-full bg-bg-light text-sm">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Package</th>
                          <th>Size (kg)</th>
                          <th>Qty</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map(item => (
                          <tr key={item.id}>
                            <td>{item.productName}</td>
                            <td>{item.packageType}</td>
                            <td>{item.sizeKg}</td>
                            <td>{item.qty}</td>
                            <td>{item.productPrice}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>)}
              </React.Fragment>
            ))} 
        </tbody>
      </table>

        {/* response message if the table is empty or failed to retrieve */}
        {filteredData.length===0 ? <p className="emptyTable">No Orders found!</p> : ""}
      </div>

      {/* Response message in a modal*/}
      <DeleteModal isOpen={showModal}  fetchData={()=>fetchOrders()} onCloseConfirm={() => onCloseConfirm()} onClose={() => {
              setShowModal(false); 
          }}>
          <DeleteConfirm onCloseConfirm={() => onCloseConfirm()}
                   deleteUrl={`${BASE_URL}/api/orders/${order_ID}`}
                   deleteName="Order"
                   fetchData={()=>fetchOrders()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </DeleteConfirm>
      </DeleteModal>


{/*  Displaying the loading modal */}
        <AuthModal isOpen={isLoading} onClose={() => {}}>
            <LoadingModal
               text="Retrieving Order records..."
               subText="Please wait while data is securely loaded"               
            />
        </AuthModal>



    {/* Update Order status modal */}
      {statusUpdate && (
        <AuthModal isOpen={statusUpdate} onClose={() => setStatusUpdate(false)}>
          {/* Any popUP right here */}
          <StatusOption
            closeStatusUpdate={ () => setStatusUpdate(false)}
            orderId={order_ID}
            fetchOrders={()=>fetchOrders()}
          />
        </AuthModal>
      )}



    </div>
  );
};


export default UsersList;

