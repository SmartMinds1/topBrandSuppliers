import React from "react";
import "./Alert.css";

const Alert = ({children, onClose})=>{

    return(
        <div className="min-w-67.5 md:min-w-85.5 max-w-[25%] bg-bg m-auto flex-col-center justify-evenly z-50 text-center">
            <div>
               <p className="w-[80%] text-center m-auto"> {children} </p>
            </div>
            <button className="w-16 h-8 rounded-2xl bg-primary hover:brightness-95 transition-all duration-300 cursor-pointer" onClick={onClose} >OK</button>
        </div>
    );
}
export default Alert