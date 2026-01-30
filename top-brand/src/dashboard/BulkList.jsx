import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import DeleteModal from "../components/modals/DeleteModal";
import DeleteConfirm from "../components/modals/DeleteConfirm";
import LoadingModal from "../components/modals/LoadingModal";
import AuthModal from "../components/modals/AuthModal";
import Modal from "../components/modals/Modal";
import { BASE_URL } from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import exportToCSV from "../utils/exportToCSV";
import useSearch from "../utils/useSearch";
import BulkFullView from "./BulkFullView";

const BulkList = () => {
  //loading state
  const [isLoading, setIsLoading] = useState(false);

  // action button 
  const [openActionId, setOpenActionId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  //States for confirm Modal
  const onCloseConfirm=() => {setShowModal(false);}

  //show quote in full view
  const [showQuote, setShowQuote] = useState(false)
  const [quote_ID, setQuote_ID] = useState(null)

  //quotes and err states
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");

  //Action button ToggleEvent
  const toggleActions = (id) => {
    setOpenActionId(prev => (prev === id ? null : id));
  };

  //fetching all bulk quotes
    const fetchBulkQuotes = async () => {
    //show loading modal
      setIsLoading(true)

      try {
        const res = await api.get("/bulk_quotes");
        setQuotes(res.data);
      } catch (err) {
        console.error("Failed to fetch bulk quotes:", err);
        setError("Failed to load bulk quotations");
      } finally {
        setIsLoading(false); // unlock UI
      }
    };



/* The data refresher when the tab is still open and a change is made */
useEffect(() => {
  // Initial load
    fetchBulkQuotes(); 

  // Set up listener
    const handleListChange = () => {
      fetchBulkQuotes(); // Re-fetch orders
    };

    window.addEventListener("listChange", handleListChange);

  // Clean up
    return () => {
      window.removeEventListener("listChange", handleListChange);
    };
  }, []);


// Reusable search hook.
  const { query, setQuery, filteredData } = useSearch(quotes, ["company_name"]);


/* Handle export to CSV file */
    const handleExportQuotes = () => {
      exportToCSV(filteredData, {
        filename: "Bulk_Quotes.csv",
        columns: [
          { key: "company_name", label: "Company" },
          { key: "contact_person", label: "Contact Person" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone Number" },
          { key: "country", label: "Country" },
          { key: "business_type", label: "Business" },
          { key: "created_at", label: "Date" },
        ],
      });
    };




  return (
    <>
     <div className="overflow-x-scroll w-190 lg:w-full">
  {/* This is the db table Header.*/}
      <div className="w-[98%] m-auto rounded-xl bg-bg flex-row-center justify-between pl-8 pr-4 h-14">
            <div className="nameOfContentDisplayed">
               <h3>All Quotes</h3>
            </div>

          {/*  sort bar */}
            <div className="w-fit h-full flex-row-center">
              <p className="mr-3"> Sort</p>
              <select name="nameOfContent" id="nameOfContent" className="bg-bg-light h-2/3 w-30 outline-0">
                    <option value="Latest selected">Latest</option>
                    <option value="Oldest">Oldest</option>
              </select>
            </div>

           {/*  search bar */}
            <div className="bg-bg-light h-3/4 flex-row-center gap-2 rounded-2xl pl-4">
                <FontAwesomeIcon icon={faSearch} className="search-icon"/>
                <input
                  className="outline-0"
                  type="text"
                  placeholder="company name"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
            </div>

          {/* export bar */}
            <div className="w-fit h-full flex-row-center">
              <button 
              onClick={handleExportQuotes}
              className="bg-primary-light cursor-pointer hover:shadow-2xl hover:shadow-primary duration-300 text-bg w-20 h-9.5 rounded-lg text-sm"> Export </button>
            </div>
      </div>

     {/*Table */}
     <div className={`w-full pl-8 h-[66vh]`}>
      <table  className="w-full mt-4 text-left leading-12 tracking-wide dataTable text-xs">
        <thead> 
          <tr>
            <th>Company</th>
            <th>Phone</th>
            <th>Business Type</th>
            <th>Products & Quantities</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.map((quote) => (
            <tr key={quote.id} className="hover:bg-bg border-b border-gray-300">
              <td>{quote.company_name}</td>
              <td>{quote.phone}</td>
              <td>{quote.business_type}</td>
              <td>
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

              <td>
                {new Date(quote.created_at).toLocaleDateString()}
              </td>

              <td className="relative">
                  <p className="cursor-pointer  text-lg" onClick={() => toggleActions(quote.id)}>⋮</p>

                  <ul className={`absolute right-0 mt-2 z-10 w-34 bg-bg-dark shadow-lg rounded-sm border border-gray-200 2-50 p-1 ${openActionId === quote.id ? "block" : "hidden"}`}>
                    <li onClick={() => {
                        setShowQuote(true);
                        setQuote_ID(quote.id);
                        setOpenActionId(null);
                      }}
                      className="px-4 py-2 hover:bg-red-50 cursor-pointer text-red-500 text-sm"
                    >
                      view details
                    </li> 

                    <li onClick={() => {
                        setShowModal(true);
                        setQuote_ID(quote.id);
                        setOpenActionId(null);
                      }}
                      className="px-4 py-2 hover:bg-red-50 cursor-pointer text-red-500 text-sm"
                    >
                      Delete
                    </li>
                  </ul>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

        {/* response message if the table is empty or failed to retrieve */}
        {filteredData.length===0 ? <p className="emptyTable">No Bulk Quotes found!</p> : ""}
      </div>
    </div>

  {/* Response message in a modal*/}
      <DeleteModal isOpen={showModal}  fetchData={()=>fetchBulkQuotes()} onCloseConfirm={() => onCloseConfirm()} onClose={() => {
        setShowModal(false); 
          }}>
          <DeleteConfirm onCloseConfirm={() => onCloseConfirm()}
                  deleteUrl={`${BASE_URL}/api/bulk_quotes/${quote_ID}`}
                  deleteName="Quote"
                  fetchData={()=>fetchBulkQuotes()}
          >
              <p className="responseMessage">Please confirm to Delete</p>
          </DeleteConfirm>
      </DeleteModal>


{/*  View details Modal */}
      <Modal isOpen={showQuote} onClose={() => {}}>
           <BulkFullView/>
      </Modal>

{/*  Displaying the loading modal */}
      <AuthModal isOpen={isLoading} onClose={() => {}}>
          <LoadingModal
            text="Retrieving Bulk Quotes..."
            subText="Please wait while data is securely loaded"               
          />
      </AuthModal>
    </>
  );
};

export default BulkList;