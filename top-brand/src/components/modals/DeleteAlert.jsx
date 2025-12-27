import React from "react";
import "./Alert.css";

const DeleteAlert = ({children, onCloseConfirm, onClose, fetchData})=>{

    return(
        <div className="min-w-67.5 md:min-w-85.5 max-w-[25%] bg-bg m-auto flex-col-center justify-evenly z-50 text-center">
           <div>
           {children}
           </div>
            <button className="w-16 h-8 rounded-2xl bg-primary hover:brightness-95 transition-all duration-300 cursor-pointer" onClick={() => {
                        onClose();    // closes the alert modal
                        onCloseConfirm();  // closes the confirm modal
                        fetchData();
             }} 
             >
                OK
            </button>
        </div>
    );
}
export default DeleteAlert