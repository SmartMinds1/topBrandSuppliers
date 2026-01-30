import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const BulkFullView = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //fetching all bulk quotes
  useEffect(() => {
    const fetchBulkQuotes = async () => {
      try {
        const res = await api.get("/bulk_quotes");
        setQuotes(res.data);
      } catch (err) {
        console.error("Failed to fetch bulk quotes:", err);
        setError("Failed to load bulk quotations");
      } finally {
        setLoading(false);
      }
    };

    fetchBulkQuotes();
  }, []);

  //HANDLING Our delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bulk quotation?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/bulk_quotes/${id}`);
      // remove from UI instantly
      setQuotes((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete bulk quotation");
    }
  };


  return (
    <div className="p-4 overflow-x-auto w-200 bg-bg-light h-300">
      <h2 className="text-xl font-semibold mb-4">Bulk Quotations</h2>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Company</th>
            <th className="border p-2">Contact</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Business Type</th>
            <th className="border p-2">Products & Quantities</th>
            <th className="border p-2">Delivery</th>
            <th className="border p-2">Additional Info</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {quotes.map((quote) => (
            <tr key={quote.id} className="hover:bg-gray-50">
              <td className="border p-2">{quote.company_name}</td>
              <td className="border p-2">{quote.contact_person}</td>
              <td className="border p-2">{quote.email}</td>
              <td className="border p-2">{quote.phone}</td>
              <td className="border p-2">{quote.country}</td>
              <td className="border p-2 capitalize">
                {quote.business_type}
              </td>

              <td className="border p-2">
                <ul className="list-disc pl-4">
                  {Object.entries(quote.quantities || {}).map(
                    ([product, qty]) => (
                      <li key={product}>
                        {product}: <strong>{qty}</strong> kg
                      </li>
                    )
                  )}
                </ul>
              </td>

              <td className="border p-2">
                {quote.delivery_requirements || "—"}
              </td>

              <td className="border p-2">
                {quote.additional_info || "—"}
              </td>

              <td className="border p-2">
                {new Date(quote.created_at).toLocaleDateString()}
              </td>

              <td className="border p-2 text-center">
                <button
                  onClick={() => handleDelete(quote.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BulkFullView;