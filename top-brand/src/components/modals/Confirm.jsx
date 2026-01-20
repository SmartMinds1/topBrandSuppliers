import React from "react";

const Confirm = ({children, onCloseConfirm, handleLogout})=>{

    return(
        <div className="h-60 rounded-md p-4 min-w-67.5 md:min-w-85.5 max-w-[25%] bg-bg m-auto flex-col-center justify-evenly z-50 text-center">
            <div>
                {children}
            </div>
            <div className="w-full h-fit p-2 flex-row-center justify-center gap-4 mt-2">
                <button className="w-16 h-8 rounded-lg bg-bg text-maintext border border-gray-300 transition-all cursor-pointer hover:brightness-90 text-sm" onClick={onCloseConfirm}>Cancel</button>
                <button className="w-16 h-8 rounded-lg bg-primary text-bg transition-all cursor-pointer hover:brightness-90 text-sm" onClick={()=>handleLogout()}>Confirm</button>
            </div> 
        </div>
    );
}
export default Confirm