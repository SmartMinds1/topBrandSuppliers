import React from "react";

const Alert = ({children, onClose})=>{

    return(
        <div className="w-40 bg-white rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center gap-4 min-w-[280px]">
            <div>
               <div className="w-[80%] text-center m-auto mb-4"> {children} </div>
            </div>
            <button className="w-16 h-8 rounded-2xl bg-primary text-bg-light text-sm hover:brightness-95 transition-all duration-300 cursor-pointer" onClick={onClose} >OK</button>
        </div>
    );
}
export default Alert