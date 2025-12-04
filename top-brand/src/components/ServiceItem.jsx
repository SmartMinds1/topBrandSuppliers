// src/components/ServiceItem.jsx
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ServiceItem = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center text-center justify-center space-y-3 bg-bg rounded-lg p-2 border border-gray-300 shadow-lg hover:shadow-2xl duration-300 w-50 h-40">
      <FontAwesomeIcon icon={icon} className="text-secondary text-4xl" />
      <p className="text-text mt-2">{label}</p>
    </div>
  );
}

export default ServiceItem
