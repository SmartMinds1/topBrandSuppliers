import React, { useState } from 'react'
import api from "../api/axiosInstance";
import AuthModal from '../components/modals/AuthModal';
import LoadingModal from '../components/modals/LoadingModal';

const StatusOption = ({closeStatusUpdate, orderId, fetchOrders}) => {
    //loading state
    const [isLoading, setIsLoading] = useState(false);

    //status states
    const [selectedStatus, setSelectedStatus] = useState("");

    //A list of allowed options
    const StatusOptions = ["pending", "processing", "shipping", "completed", "cancelled"]

    //handling new status
    const handleSaveStatus = async () => { 
        setIsLoading(true);
      
        try {
           await api.put(`/orders/status/${orderId}`, { status: selectedStatus});
           fetchOrders(); // refresh list

        } catch (err) {
          console.error("Error updating your order:", err);
        } finally {
          setIsLoading(false);
        }
    
    }
  return (
    <>
        <div className='bg-bg-light h-90 w-80 rounded-lg p-6'>
                {/* Preset sizes */}
                 <div className="flex-col-start justify-evenly h-[80%]">
                    {StatusOptions.map((status, index) => (
                      <label
                        key={index}
                        className={`px-2 py-1 text-sm tracking-wide rounded-lg cursor-pointer ${
                          selectedStatus === status
                            ? "bg-primary text-bg-light"
                            : "bg-bg-dark"
                        }`}
                      >
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={selectedStatus === status}
                          onChange={() => setSelectedStatus(status)}
                          className="hidden"
                        />
                        {status}
                      </label>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 mt-4">
                        <button onClick={closeStatusUpdate} className=" text-sm px-2 py-1 bg-gray-200 rounded cursor-pointer hover:brightness-90 duration-300">Cancel</button>
                        <button onClick={handleSaveStatus} className="text-sm px-2 py-1 bg-primary text-white rounded cursor-pointer hover:brightness-90 duration-300">Save</button>
                  </div>
            </div>

            {/*  Displaying the loading modal */}
            <AuthModal isOpen={isLoading} onClose={() => {}}>
                <LoadingModal
                text="Updating Order Status..."
                subText="Please wait"               
                />
            </AuthModal>
</>
  )
}

export default StatusOption
