import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft, faQuoteRight, faStar} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const TestimonialCard = ({rateImg, rateMessage, rateName, cardRating})=> {

/*To be able to render the rating stars nicely, we need the logic below */
const renderStars = () => {
        const stars = [];
        const fullStars = parseInt(cardRating);
        const emptyStars = 5 - fullStars;

        //redering full stars
        for (let i = 0; i < fullStars; i++) {
            stars.push(
            <FontAwesomeIcon
                key={`full-${i}`}
                icon={faStarSolid}
                className=" text-primary text-xs"
            />
            );
        }
        
        //redering empty stars
        for (let i = 0; i < emptyStars; i++) {
            stars.push(
            <FontAwesomeIcon
                key={`empty-${i}`}
                icon={faStar}
                className="text-text text-xs"
            />
            );
        }

        return stars;
    };

    return(
        <div className='w-full sm:w-140 md:w-90 lg:w-130 h-100 sm:h-85 mb-12 flex-col-center justify-center'>
             {/* Image div */}
            <div className="w-30 h-30 rounded-full bg-top bg-cover" style={{ backgroundImage: `url(${rateImg})`}}> </div>

            {/* review message */}
            <div className="w-[90%] m-auto h-fit text-text text-center">
                <p><FontAwesomeIcon icon={faQuoteLeft} className="text-sm ml-2 mr-2 text-maintext"/> {rateMessage} <FontAwesomeIcon icon={faQuoteRight} className="text-sm ml-2 mr-2 text-maintext" /></p>
            </div>

            <div className="w-50 flex-row-center justify-evenly">
                {/* lets now render the stars */}
                {renderStars()}
                <p>{cardRating}/5</p>
            </div>

            <h2 className=" text-maintext font-bold text-xl mt-4 mb-12 sm:mt-4 sm:mb-8">{rateName}</h2>  

        </div>
    );
}

export default TestimonialCard