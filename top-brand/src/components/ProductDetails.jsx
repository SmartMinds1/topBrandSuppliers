import React, { useState } from "react";
import { productData } from "../../constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStar, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faStarHalfAlt } from "@fortawesome/free-regular-svg-icons";
import { useCart } from "../context/CartContext";
import { packagingData } from "../../constants/Packaging";


export default function ProductDetails({product, onClose}) {
  //Total Cart Items
    const { cartItems } = useCart();
    const singleCount = cartItems.find(item => item.id === product)?.qty || 0;

  /* packaging states */  
  const [selectedPackageType, setSelectedPackageType] = useState("retail");
  const [selectedSize, setSelectedSize] = useState("");


  /* states for custom sizes */
  const [customSize, setCustomSize] = useState("");
  const [sizeError, setSizeError] = useState("");

  /* retrieving packages*/
  const productCategory = productData[product]?.category;
  const productPackages = packagingData[productCategory];

  /* retrieving package sizes */
  const availableSizes = selectedPackageType 
    ? productPackages[selectedPackageType].sizes
    : [];

  /* Formating selected product sizes */
  const parseSizeToGrams = (size) => {
    if (size.includes("kg")) return parseFloat(size) * 1000;
    if (size.includes("g")) return parseFloat(size);
    return 0;
  };
  const formatGramsToLabel = (grams) => {
    return grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`;
  };

/* Derive min & max size dynamically */
    const sizeValuesInGrams = availableSizes.map(parseSizeToGrams);
    const minSize = sizeValuesInGrams.length ? Math.min(...sizeValuesInGrams) : 0;
    const maxSize = sizeValuesInGrams.length ? Math.max(...sizeValuesInGrams) : 0;
    
/* Converting user inputs into kg before adding to cart */
    const sizeLabelToKg = (sizeLabel) => {
      if (!sizeLabel) return 0;

      if (sizeLabel.includes("kg")) {
        return parseFloat(sizeLabel);
      }

      if (sizeLabel.includes("g")) {
        return parseFloat(sizeLabel) / 1000;
      }

      return 0;
    };
   /* converting that specific selected size */
    const sizeKg = sizeLabelToKg(selectedSize);


  //handling add to cart
    const { addToCart } = useCart();

    if (!productData[product]) {
        return (
          <div className="py-16 px-6 md:px-20 bg-bg w-[90vw] h-screen m-auto shadow-2xl ">
              <div className="w-full h-8 bg-transparent text-right mb-6 fixed top-3 right-[7%] md:right-[6%]">
                 <button onClick={onClose} className="bg-bg-light shadow-2xl w-6 h-6 rounded-full text-background hover:brightness-80 duration-300 cursor-pointer"> <FontAwesomeIcon icon={faTimes}/></button>
              </div>
              <div className="flex-col-center justify-center w-full h-[80vh]">
                  <p className="text-center py-16 text-gray-600">This product will be <span className="text-accent font-bold"> COMMING SOON!</span> <span className="text-accent font-bold text-2xl animate-ping"> . . .</span></p>
              </div>
          </div>
        )
      }

  return (
    <section className="py-16 px-4 md:px-20 lg:px-0 xl:px-20 bg-bg-light w-[90vw] m-auto shadow-2xl">
        <div className="w-[80%] flex-row-center justify-between h-8 text-right fixed top-3 right-[7%] md:right-[6%]">
          {/* item count */}
            {singleCount > 0 ? (
                  <span className="bg-accent text-xs px-2 py-1 rounded-full text-bg-light">
                    {singleCount}
                  </span>
                ) : (
                  <span className="bg-gray-300 text-xs px-2 py-1 rounded-full opacity-50">
                    0
                  </span>
              )}
          {/*  close btn */}
            <button onClick={onClose} className="bg-bg-dark shadow-2xl w-6 h-6 rounded-full text-background hover:brightness-80 duration-300 cursor-pointer"> <FontAwesomeIcon icon={faTimes}/></button>
        </div>


  {/* Product image and details */}
        <div className="w-full sm:w-[90%] lg:w-full m-auto h-fit lg:h-screen xl:h-[90vh] flex-row-center justify-evenly flex-wrap lg:flex-nowrap gap-4">
          {/* PRODUCT IMAGES */}
                <div className="w-full sm:w-120 lg:w-96 h-84 md:h-full flex-col-center">
                    <img
                        src={productData[product].image}
                        alt={productData[product].title}
                        className="w-full h-65 object-cover rounded-xl bg-bg-dark object-center"
                    />
                    <div className=" w-full h-20 flex-row-center justify-center gap-4">
                      {/* image1 */}
                      <div className="w-20 h-12 bg-bg-dark rounded-lg shadow hover:scale-110 ease-in-out duration-500 cursor-pointer"></div>
                      {/* image2 */}
                      <div className="w-20 h-12 bg-bg-dark shadow rounded-lg hover:scale-110 ease-in-out duration-500 cursor-pointer"></div> 
                    </div>

                    <div className="w-full h-fit lg:h-40 flex-col-center justify-evenly mt-6 gap-1">
                      <div className="w-30 h-30 bg-[url('/clovesQR.webp')] bg-contain bg-no-repeat hidden lg:block"></div>
                      <p className="text-center"> <a className="text-blue-500"  href="https://youtu.be/ptZggFq5Hp8?si=kDcVWWC73dEtWstC"> click to learn more </a> on this product </p>
                    </div>
                </div>

          {/* PRODUCT DETAILS */}
                <div className="w-full lg:w-1/2 h-full flex-col-start justify-start gap-4 md:gap-3 mt-2">
                   {/*  title */}
                   <p className="text-maintext text-3xl font-bold font-sans sp-2  tracking-wider">{productData[product].title}</p>
                    
                    <div className="flex fle-row items-start gap-4">
                      {/* price */}
                      <p className="font-semibold text-xl text-primary">${productData[product].price}.00</p>
                      {/*  rating */}
                      <div>
                        <FontAwesomeIcon icon={faStar} className="text-xs text-accent"/>
                        <FontAwesomeIcon icon={faStar} className="text-xs text-accent"/>
                        <FontAwesomeIcon icon={faStar} className="text-xs text-accent"/>
                        <FontAwesomeIcon icon={faStar} className="text-xs text-accent"/>
                        <FontAwesomeIcon icon={faStarHalfAlt} className="text-xs text-text"/>
                      </div>
                    </div>

                  {/* description */}
                    <p className="text-text w-full leading-relaxed">{productData[product].description} </p>
                    
                   {/* Mapping benefits */}
                    <div  className="w-full h-fit mb-2">
                        <p className="text-maintext text-xl font-semibold tracking-wide mb-2">Benefits</p>
                        <div className="text-text pl-6 grid grid-cols-1">
                          {(productData[product].benefits).map((benefit, index) => (
                            <p key={index} className="list-disc flex-row-center flex-nowrap gap-2 ">
                             <FontAwesomeIcon icon={faCheck} className="text-sm text-primary" /> {benefit}
                            </p>
                          ))}
                        </div>
                    </div>

                  {/* Select Packaging */}
                  <div className="w-full h-fit">
                                    
                  <div className="w-full">
                    <label className="block text-maintext font-semibold mb-2">
                      Package Type
                    </label>

                    <select
                        value={selectedPackageType}
                        onChange={(e) => {
                          setSelectedPackageType(e.target.value);
                          setSelectedSize(""); // reset size when package changes
                        }}
                        className="w-full hover:bg-bg-dark p-2 outline-0 rounded-lg bg-bg border border-gray-300"
                      >
                      {/*  <option value="">Select package type</option> */}
                        {Object.keys(productPackages).map((pkg) => (
                          <option key={pkg} value={pkg}>
                            {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                          </option>
                        ))}
                    </select>
                  </div>

{/* -----------------SELECTING THE RIGHT SIZE---------------------- */}
      {selectedPackageType && (
        <div className="w-full mt-4 flex-row-start justify-between flex-wrap gap-2">
              <div>
                <p className="text-maintext font-semibold mb-2">Select Size</p>
                {/* Preset sizes */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {availableSizes.map((size) => (
                      <label
                        key={size}
                        className={`px-2 py-1 rounded-lg cursor-pointer ${
                          selectedSize === size
                            ? "bg-primary text-bg-light"
                            : "bg-bg"
                        }`}
                      >
                        <input
                          type="radio"
                          name="size"
                          value={size}
                          checked={selectedSize === size}
                          onChange={() => {
                            setSelectedSize(size);
                            setCustomSize("");
                            setSizeError("");
                          }}
                          className="hidden"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

            {/* Custom size */}
                <div>
                  <label className="block text-sm text-text mb-2 mt-1">
                    Custom size ({formatGramsToLabel(minSize)} - {" "}
                    {formatGramsToLabel(maxSize)})
                  </label>

                  <input
                    type="number"
                    placeholder="Enter size in grams"
                    value={customSize}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setCustomSize(value);
                      setSelectedSize("");

                      if (value < minSize || value > maxSize) {
                        setSizeError(
                          `Size must be between ${formatGramsToLabel(minSize)} and ${formatGramsToLabel(maxSize)}`
                        );
                      } else {
                        setSizeError("");
                        setSelectedSize(formatGramsToLabel(value));
                      }
                    }}
                    className="w-full p-1 pl-2 outline-0 rounded-lg bg-bg border border-gray-300"
                  />

                  {sizeError && (
                    <p className="text-red-500 text-sm mt-1">{sizeError}</p>
                  )}
                </div>
              </div>
            )}

        {/* Now let's add to Cart OR request a bulk quote */}
          <div className='w-full h-fit text-center mt-7 flex-row-center justify-start gap-6 lg:gap-12 flex-wrap'>
             {/* add to cart button */}
              <button
                disabled={!selectedPackageType || !selectedSize}
                onClick={() =>
                  addToCart({
                    ...productData[product],
                    id: product,
                    packageType: selectedPackageType,
                    // normalized values
                    sizeKg,              // number → ALWAYS kg
                    sizeLabel: selectedSize, // original label (100g, 10kg)
                  })
                  
                }
                className="btn-primary green-shadow w-60 disabled:opacity-50"
              >
                Add to cart
              </button>
          
            {/* bulk QUOTE button */}
            <button className="btn-secondary green-shadow">Bulk Quote</button>
          </div> 
       </div>
   </div>
</div>

      {/* PACKAGING SECTIION */}
        <div className="mb-4 mt-12 p-2">
          <h2 className="text-xl md:text-2xl font-semibold text-maintext">
            Available Packaging Formats
          </h2>
          <p className="mt-2 md:text-base text-text max-w-3xl">
            Below is a detailed breakdown of our available packaging formats, including
            suitable materials, target buyers, and size options. Select a package type
            that best aligns with your distribution and storage requirements.
          </p>
        </div>

      {/* packaging details */}
        <div className="w-full h-fit overflow-x-scroll mt-12 p-2">
            <table className="w-full min-w-180 text-left border-collapse">
              <thead>
                <tr className="bg-bg-dark text-maintext font-semibold">
                  <th className="py-3 px-4">Package Type</th>
                  <th className="py-3 px-4">Materials</th>
                  <th className="py-3 px-4">Audience</th>
                  <th className="py-3 px-4">Sizes</th>
                </tr>
              </thead>

              <tbody>
                {
                !productPackages || Object.keys(productPackages).length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-8 text-center text-text opacity-70"
                    >
                      Kindly select your package type!
                    </td>
                  </tr>
                ) : (

                Object.entries(productPackages).map(
                  ([packageType, details], index) => (
                    <tr 
                    key={packageType}
                    className={`${
                      index % 2 === 0 ? "bg-bg-light" : "bg-transparent"
                    } hover:bg-bg duration-300 text-sm`}
                    >
                      <td className="py-3 px-4">{packageType}</td>
                      <td className="py-3 px-4">{details.materials.join(", ")}</td>
                      <td className="py-3 px-4">{details.audience.join(", ")}</td>
                      <td className="py-3 px-4">{details.sizes.join(", ")}</td>
                    </tr>
                  )
                )
                )}
              </tbody>
            </table>
        </div>

    </section>
  );
}