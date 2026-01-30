import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import AuthModal from "./modals/AuthModal";
import Alert from "./modals/Alert";
import LoadingModal from "./modals/LoadingModal";
import api from "../api/axiosInstance";

const BulkQuotationForm = ({onClose}) => {
  //loading state
  const [isLoading, setIsLoading] = useState(false);

  //Setting up our feedback modal
  const [showModal, setShowModal] = useState(false);
  const[responseMessage, setResponseMessage] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    businessType: "",
    products: [],
    deliveryRequirements: "",
    additionalInfo: "",
    quantities: {
      honey: "",
      cashew: "",
      clove: "",
      ginger: "",
      macadamia:""
    }
  });

  const productList = [
    {
      id: "honey",
      name: "Bee MyLyf Honey Collection",
      desc: "Premium African honey products",
    },
    {
      id: "cashew",
      name: "Premium Cashew Collection",
      desc: "High-quality cashew nuts and products",
    },
    {
      id: "clove",
      name: "Premium Clove Collection",
      desc: "Aromatic clove spices and extracts",
    },
    {
      id: "ginger",
      name: "Ginger Collection",
      desc: "Fresh ginger roots, powders, and extracts",
    },
    {
      id: "macadamia",
      name: "Macadamia Collection",
      desc: "High-quality macadamia nuts and processed products",
    },
  ];

  // Handle general input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name.includes("-qty")) {
      const key = name.split("-")[0];
      setFormData((prev) => ({
        ...prev,
        quantities: { ...prev.quantities, [key]: value },
        products: value
          ? [...new Set([...prev.products, key])]
          : prev.products.filter(p => p !== key),
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle product checkbox toggle
  const toggleProduct = (product) => {
    setFormData((prev) => {
      const exists = prev.products.includes(product);
      return {
        ...prev,
        products: exists
          ? prev.products.filter((p) => p !== product)
          : [...prev.products, product],
      };
    });
  };

 //handleSubmit sends the user's ORDER Inputs to the database
    const handleSubmit = async (e) => {
      e.preventDefault();

        const filteredQuantities = Object.fromEntries(
            formData.products
              .filter(p => formData.quantities[p])
              .map(p => [p, Number(formData.quantities[p])])
          );
      

        const payload = {
            ...formData,
            quantities: filteredQuantities,
            phone: formData.phone.replace(/\s+/g, ""),
          };


        console.log("Payload sending to backend:", {
            ...formData,
            quantities: filteredQuantities,
            phone: formData.phone.replace(/\s+/g, "")
          });

      //initialize loading
          setIsLoading(true);
          setShowModal(false); 
          setResponseMessage("");

    try {
        const response = await api.post(`/bulk_quotes`, payload);
        setResponseMessage(response.data.message);
        setFormData({
          companyName: "",
          contactPerson: "",
          email: "",
          phone: "",
          country: "",
          businessType: "",
          products: [],
          deliveryRequirements: "",
          additionalInfo: "",
          quantities: {
            honey: "",
            cashew: "",
            clove: "",
            ginger: "",
            macadamia:""
          }
        });
        }
            
        catch(error){
          setResponseMessage("ERROR! sending request, try again later!");
        }finally{
          setIsLoading(false);
        } 
    }

  // Show modal only when responseMessage changes and is not empty
      useEffect(() => {
        if (responseMessage) {
            setShowModal(true);
        }
      }, [responseMessage]);


  return (
    <>
    <div className="max-w-4xl mx-auto p-2 pt-12 sm:p-16 bg-bg-light">
      {/* close button */}
        <div className="w-[64%] flex-row-center justify-end h-8 text-right fixed top-3 right-[7%] md:right-[18%]">
            <button onClick={onClose} className="bg-bg-dark shadow-2xl w-6 h-6 rounded-full text-background hover:brightness-80 duration-300 cursor-pointer flex-col-center justify-center"> <FontAwesomeIcon icon={faTimes} className="text-xs"/></button>
        </div>

      {/* Header */}
      <div className="text-center mb-2 mt-8 sm:mb-8">
        <h3 className="text-2xl font-semibold text-primary"><span className="text-accent">|</span> Request Bulk Order Quotation</h3>
        <p className="text-text text-left sm:text-center text-xs sm:text-base mt-2 w-[90%] sm:w-[70%] m-auto font-light">
          Get competitive pricing for large quantity orders. Fill out the form
          and receive a detailed quotation within <span className="text-accent font-semibold">24 hours</span>.
        </p>
      </div>

      <br /><br />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 p-2 sm:p-0">
          <div className="bg-bg w-full tracking-wide">
              <input
                className='outline-gray-200 bg-bg w-full p-2 text-sm text-text'
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Campany Name *"
              />
          </div>

          <div className="bg-bg w-full tracking-wide">
              <input
              className='outline-gray-200 bg-bg w-full p-2 text-sm text-text'
              type="text"
              name="contactPerson"
              required
              value={formData.contactPerson}
              onChange={handleChange}
              placeholder="Contact Person *"
            />
          </div>
        </div>

        {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 p-2 sm:p-0">
          <div className="bg-bg w-full tracking-wide">
            <input
              className='outline-gray-200 bg-bg w-full p-2 text-sm text-text'
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Email *"
            />
          </div>

          <div className="bg-bg w-full tracking-wide">
            <input
              className='outline-gray-200 bg-bg w-full p-2 text-sm text-text'
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone *"
            />
          </div>
        </div>

        {/* Row 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16 p-2 sm:p-0">
          <div className="bg-bg w-full tracking-wide">
            <input
              className='outline-gray-200 bg-bg w-full p-2 text-sm text-text'
              type="text"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              placeholder="Country *"
            />
          </div>

          <div className="bg-bg w-full tracking-wide">
              <select
              className='outline-gray-200 bg-bg w-full p-2 text-sm text-text'
              name="businessType"
              required
              value={formData.businessType}
              onChange={handleChange}
              placeholder="Business Type *"
            >
              <option value="" >Select Business Type</option>
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="distributor">Distributor</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="restaurant">Restaurant/Food Service</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <br /><br />

        {/* Product Selection */}
        <div>
          <label className="text-primary text-lg font-semibold pl-2 sm:pl-0">Products of Interest *</label>

          <div className="mb-10">
            {productList.map((prod) => (
              <label
                key={prod.id}
                className="flex-row-center justify-between p-3 cursor-pointer hover:bg-bg mb-4"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    onChange={() => toggleProduct(prod.id)}
                    checked={formData.products.includes(prod.id)}
                    className="mt-2"
                  />
                  <div>
                    <div>{prod.name}</div>
                    <div className="text-text text-sm font-light">{prod.desc}</div>
                  </div>
                </div>

                <input
                  className="w-20 h-9 text-sm p-2 outline-none shadow bg-bg"
                  type="number"
                  name={`${prod.id}-qty`}
                  placeholder="Qty(kg)"
                  min="100"
                  max="1000"
                  maxLength={5}
                  value={formData.quantities[prod.id]}
                  onChange={handleChange}
                  required={formData.products.includes(prod.id)}// If checked, then qty is required
                  disabled={!formData.products.includes(prod.id)}//check it out later

                />
              </label>
            ))}
          </div>
        </div>

        <br /><br />

        {/* Delivery Requirements */}
        <div className="p-2 sm:p-0">
          <label className="text-primary text-lg font-semibold">Delivery Requirements</label>
             <textarea 
                className="w-full h-20 resize-none p-4 mt-10 outline-none border-b border-text-light text-sm hover:border-primary duration-300 ease-in-out"
                type="text"
                name="deliveryRequirements"
                placeholder="Packaging requests, delivery timeline, special instructions..."
                value={formData.deliveryRequirements}
                onChange={handleChange}
          
              />
                        
        </div>

        <br /><br />

        {/* Additional Info */}
        <div className="p-2 sm:p-0">
            <label className="text-primary text-lg font-semibold">Additional Information</label>
            <textarea 
                className="w-full h-20 resize-none p-4 mt-10 outline-none border-b border-text-light text-sm hover:border-primary duration-300 ease-in-out"
                type="text"
                id="message"
                name="additionalInfo"
                placeholder="Any other notes or questions..."
                value={formData.additionalInfo}
                onChange={handleChange}
              />
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary green-shadow w-50 mt-8 ml-2 sm:ml-0">Request Quotation</button>
      </form>

        <div className="text-sm text-gray-500 mt-12 p-2">
          <strong className="text-primary">Note:</strong> All required fields must be filled. We’ll get
          back within 24 hours. For urgent requests, please call us directly.
        </div>

        <br />
    </div>

        {/*  Displaying feedback message */}
        <AuthModal isOpen={showModal} onClose={() => {
          setShowModal(false); 
          setResponseMessage("");//reset so that to trigger useEffect
      }}>

      <Alert onClose={() => {
          setShowModal(false); 
          setResponseMessage("");
      }}
      >
          <p className="responseMessage">{responseMessage}</p>
      </Alert>
    </AuthModal>

    {/*  Displaying the loading modal */}
    <AuthModal isOpen={isLoading} onClose={() => {}}>
      <LoadingModal
        text="Submitting Your Order Request..."
        subText="Please wait..."
      />
    </AuthModal>
</>
  );
};

export default BulkQuotationForm;
