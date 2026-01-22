import React, { useState, useEffect } from "react";
import ModifyOrder from "./ModifyOrder";
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

//Handling solo client orders
const OrdersTable = () => {
  //loading state
  const [isLoading, setIsLoading] = useState(false);

  // action button 
    const [openActionId, setOpenActionId] = useState(null);
    const [orders, setOrders] = useState([]);
    const [order_ID, setOrder_ID] = useState("");
    const [expandedOrderId, setExpandedOrderId] = useState(null);
 
     
   //setting up feedback message using a modal
     const [showModal, setShowModal] = useState(false);
 
   //Action button ToggleEvent
      const toggleActions = (id) => {
            setOpenActionId(prev => (prev === id ? null : id));
      };
 
    //fetching ORDERS
       const fetchOrders = async () => {
            //show loading modal
              setIsLoading(true)
        
              try {
                const res = await api.get(`${BASE_URL}/api/orders/my-orders`);
                setOrders(res.data);
        
              }catch (err) {
                console.error("Error fetching individual orders:", err);
        
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
     const { query, setQuery, filteredData } = useSearch(orders, ["status"]);
 
 
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
 

  //modify order states
  const [editingOrder, setEditingOrder] = useState([]);
  const [ editingId, setEditingId] = useState(null);
  
  //Client Order Modification
  const handleModifyOrder = (orderId, items) => {
     setEditingOrder(items);
     setEditingId(orderId);

    if (!editingOrder) return;
    setShowModal(true);
  };

  //update order to backened
  const updateOrder = async (modifiedItems) => {
    setIsLoading(true);
  
    try {
      await api.put(`/orders/my-orders/${editingId}`, {
        items: modifiedItems
      });
  
      fetchOrders(); // refresh list
    } catch (err) {
      console.error("Error updating your order:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

    return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg">
          <thead className="bg-bg text-left">
            <tr>  
              <th className="p-2 text-left">User id</th>
              <th className="p-2">Order Id</th>
              <th className="p-2">Total_amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
  
          <tbody>
            { orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
              orders.map((order) => (
              <tr key={order.id} className="">
                <td className="p-2 text-xs">{order.user_id}</td>
                <td className="p-2 text-xs">{order.id}</td>
  
                <td className="p-2 text-sm">
                  {order.total_amount}
                </td>
  
                <td className="p-2">
                  <span
                      className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "shipping"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
  
                <td className="p-2 text-xs">
                  {order.created_at ? new Date(order.created_at).toLocaleDateString(): "—"}
                </td>
  
                <td className="p-2">
                  {order.status === "pending" ? (
                    <button
                      onClick={() => handleModifyOrder(order.id, order.items)}
                      className="text-sm bg-primary text-white px-3 py-1 rounded"
                    >
                      Modify
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Locked
                    </span>
                  )}
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>

  {/* Displaying the Cliet order editing modal */}
      {showModal && editingOrder && (
        <AuthModal isOpen={showModal} onClose={() => {
              setShowModal(false);   
              }}>
              <ModifyOrder
                  editingOrder={editingOrder}
                  closeModify={() => setShowModal(false)}
                  onSave={(modifiedItems) => { //This onsave funtion runs on modifyOrder, it receives the modified order
                    updateOrder(modifiedItems);
                    setShowModal(false);
                  }}
                /> 
              </AuthModal>
        )}
 </div>
    );
  };
  export default OrdersTable;
  