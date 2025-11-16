import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const WhatsapChat = ()=>{
    return(
        <div>
            <a
                href={`https://wa.me/254115154402?text=${encodeURIComponent("Hello, Welcome to topBrand Suppliers!")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-5 right-1 sm:right-5 w-12 h-12 flex-row-center justify-center shadow-2xl"
                >
                    <FontAwesomeIcon icon={faWhatsapp}  className="text-4xl text-green-500 animate-bounce"/>
                </a>

        </div>
    )
}

export default WhatsapChat