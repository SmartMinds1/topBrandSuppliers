import React,{useState, useEffect} from "react";
import api from "../../api/axiosInstance"
import DeleteModal from "./DeleteModal";
import DeleteAlert from "./DeleteAlert";

const UpdateConfirm = ({children, onCloseConfirm, deleteUrl, deleteName, fetchData,  closeModify})=>{

//setting up feedback message using a popUp
  const [showModal, setShowModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

//HANDLING DELETE
    const handleDelete = async () => {
        try {
          const response = await api.patch(deleteUrl);
          setResponseMessage(response.data.message); 
  
        } catch (error) {
          setResponseMessage(`Failed to Cancel ${deleteName}`, error.response?.data || error);
        }
      };
  
   
// Show modal only when responseMessage changes and is not empty
        useEffect(() => {
          if (responseMessage) {
            setShowModal(true);
          }
        }, [responseMessage]);

    return(
     <>
      <div className="h-[25vh] min-w-67.5 rounded-lg md:min-w-85.5 max-w-[25%] bg-bg m-auto flex-col-center justify-evenly z-50 text-center">
          <div>
              {children}
          </div>
          <div className="w-full h-fit p-2 flex-row-center justify-center gap-4 mt-2">
                <button className="w-16 h-8 rounded-lg bg-bg text-maintext border border-gray-300 transition-all cursor-pointer hover:brightness-90 text-sm" onClick={onCloseConfirm}>Cancel</button>
                <button className="w-16 h-8 rounded-lg bg-primary text-bg transition-all cursor-pointer hover:brightness-90 text-sm" onClick={()=>{handleDelete();}}>Confirm</button>
          </div> 
      </div>
        
{/*  Displaying the response messsage using a popUP. This is when deleting or updating within  the list */}
       <DeleteModal isOpen={showModal}  onCloseConfirm={() => onCloseConfirm()}  fetchData={()=>fetchData()}  onClose={() => {
              setShowModal(false); 
              setResponseMessage("");//reset so that to trigger useEffect on the second time
          }}>
          <DeleteAlert onClose={() => {
              setShowModal(false); 
              setResponseMessage(""); 
                }
              }
              onCloseConfirm={() => onCloseConfirm()} 
              fetchData={()=>fetchData()} 
              closeModify={()=>closeModify()}
          >
              <p className="responseMessage">{responseMessage}</p>
          </DeleteAlert>
      </DeleteModal>
      
        </>
    );
}
export default UpdateConfirm