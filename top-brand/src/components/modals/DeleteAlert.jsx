import React from "react";

const DeleteAlert = ({children, onCloseConfirm, onClose, fetchData})=>{

    return(
        <div className="h-40 min-w-67.5 md:min-w-85.5 max-w-[25%] bg-bg m-auto flex-col-center justify-evenly z-50 text-center rounded-lg">
           <div>
           {children}
           </div>
            <button className="w-16 h-8 rounded-lg bg-primary hover:brightness-95 transition-all duration-300 cursor-pointer text-bg-light" onClick={() => {
                        onClose();    // closes the alert modal
                        onCloseConfirm();  // closes the confirm modal
                        fetchData();
             }} 
             >
                ok
            </button>
        </div>
    );
}
export default DeleteAlert