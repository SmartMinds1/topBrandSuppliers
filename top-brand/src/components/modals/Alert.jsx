import React from "react";

const Alert = ({children, onClose})=>{

    return(
        <div className="min-w-67.5 p-6 sm:p-8 rounded-md md:min-w-85.5 max-w-[25%] bg-bg m-auto flex-col-center justify-evenly z-50 text-center mt-[30vh]">
            <div>
               <p className="w-[80%] text-center m-auto mb-4"> {children} </p>
            </div>
            <button className="w-16 h-8 rounded-2xl bg-primary text-bg-light text-sm hover:brightness-95 transition-all duration-300 cursor-pointer" onClick={onClose} >OK</button>
        </div>
    );
}
export default Alert