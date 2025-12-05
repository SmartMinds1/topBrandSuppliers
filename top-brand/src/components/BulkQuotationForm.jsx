import React, { useState } from "react";

const BulkQuotationForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    country: "",
    businessType: "",
    products: [],
    volumes: "",
    deliveryRequirements: "",
    additionalInfo: "",
    quantities: {
      honey: "",
      cashew: "",
      clove: ""
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
  ];

  // Handle general input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("-qty")) {
      const key = name.split("-")[0];
      setFormData((prev) => ({
        ...prev,
        quantities: { ...prev.quantities, [key]: value },
      }));
    } else {
      setFormData({ ...formData, [name]: value });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED:", formData);
    alert("Quotation request submitted!");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold">Request Bulk Order Quotation</h3>
        <p className="text-gray-600 mt-2">
          Get competitive pricing for large quantity orders. Fill out the form
          and receive a detailed quotation within 24 hours.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Company Name *</label>
            <input
              type="text"
              name="companyName"
              required
              className="form-input"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Contact Person *</label>
            <input
              type="text"
              name="contactPerson"
              required
              className="form-input"
              value={formData.contactPerson}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Phone Number *</label>
            <input
              type="tel"
              name="phone"
              required
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label">Country *</label>
            <input
              type="text"
              name="country"
              required
              className="form-input"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="form-label">Business Type *</label>
            <select
              name="businessType"
              required
              className="form-select"
              value={formData.businessType}
              onChange={handleChange}
            >
              <option value="">Select Business Type</option>
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="distributor">Distributor</option>
              <option value="manufacturer">Manufacturer</option>
              <option value="restaurant">Restaurant/Food Service</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Product Selection */}
        <div>
          <label className="form-label">Products of Interest *</label>

          <div className="space-y-3 mt-3">
            {productList.map((prod) => (
              <label
                key={prod.id}
                className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    onChange={() => toggleProduct(prod.id)}
                    checked={formData.products.includes(prod.id)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-semibold">{prod.name}</div>
                    <div className="text-gray-500 text-sm">{prod.desc}</div>
                  </div>
                </div>

                <input
                  type="number"
                  name={`${prod.id}-qty`}
                  placeholder="Qty"
                  min="1"
                  className="w-20 form-input"
                  value={formData.quantities[prod.id]}
                  onChange={handleChange}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Volume */}
        <div>
          <label className="form-label">Expected Monthly Volume</label>
          <select
            name="volumes"
            className="form-select"
            value={formData.volumes}
            onChange={handleChange}
          >
            <option value="">Select Volume Range</option>
            <option value="100-500kg">100-500 kg</option>
            <option value="500-1000kg">500-1,000 kg</option>
            <option value="1000-5000kg">1,000-5,000 kg</option>
            <option value="5000-10000kg">5,000-10,000 kg</option>
            <option value="10000+kg">10,000+ kg</option>
          </select>
        </div>

        {/* Delivery Requirements */}
        <div>
          <label className="form-label">Delivery Requirements</label>
          <textarea
            name="deliveryRequirements"
            className="form-textarea"
            placeholder="Packaging requests, delivery timeline, special instructions..."
            value={formData.deliveryRequirements}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Additional Info */}
        <div>
          <label className="form-label">Additional Information</label>
          <textarea
            name="additionalInfo"
            className="form-textarea"
            placeholder="Any other notes or questions..."
            value={formData.additionalInfo}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-semibold"
        >
          Request Quotation
        </button>

        <div className="text-sm text-gray-500 mt-2">
          <strong>Note:</strong> All required fields must be filled. We’ll get
          back within 24 hours. For urgent requests, please call us directly.
        </div>
      </form>
    </div>
  );
};

export default BulkQuotationForm;
