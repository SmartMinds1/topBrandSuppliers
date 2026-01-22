import React, {useState} from "react";

const ModifyOrder = ({ editingOrder, closeModify, onSave }) => {
    const [items, setItems] = useState(editingOrder);
  
    // Increase quantity
    const increaseQty = (id, sizeKg) => {
      setItems(prev => prev.map(x =>
        x.id === id && x.sizeKg === sizeKg ? { ...x, qty: x.qty + 1 } : x
      ));
    };
  
    // Decrease quantity
    const decreaseQty = (id, sizeKg) => {
      setItems(prev => prev.map(x =>
        x.id === id && x.sizeKg === sizeKg ? { ...x, qty: x.qty - 1 } : x
      ).filter(x => x.qty > 0));
    };
  
    const total = items.reduce((sum, x) => sum + x.productPrice * x.sizeKg * x.qty, 0);
  
    const handleSave = () => {
      onSave( items );
    };
    
  
    return (
        <div className="bg-bg-light flex flex-col justify-between p-6 w-75 sm:w-90 h-100 sm:h-120 rounded-md">
              <h3 className="text-lg font-bold mb-4">Modify Order</h3>
          
              <div className="overflow-y-scroll">
                  {items.map(item => (
                    <div key={`${item.id}_${item.sizeKg}`} className="bg-bg shadow p-2 mb-2">
                      {/*  item title */}
                      <p className="font-light">{item.productName}<span className="font-semibold text-sm text-maintext"> ({item.sizeKg}kg)</span></p>
                      {/* modify buttons */}
                      <div className="flex-row-center justify-between h-10">
                        <p className="text-primary">${(item.productPrice * item.qty * item.sizeKg).toFixed(2)}</p>
                        <div className="flex items-center gap-1">
                            <button
                              className="flex-col-center justify-center w-6 h-5 border border-gray-300 rounded-md hover:bg-bg-dark cursor-pointer"
                              onClick={() => decreaseQty(item.id, item.sizeKg)}
                            >-</button>
                            <span  className="w-10 h-7 bg-gray-200 rounded-lg flex-col-center justify-center">{item.qty}</span>
                            <button
                              className="flex-col-center justify-center w-6 h-5 border border-gray-300 text-sm rounded-md hover:bg-bg-dark cursor-pointer"
                              onClick={() => increaseQty(item.id, item.sizeKg)}
                            >+</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <h4 className="mt-2 text-text">Total: <span className="font-bold text-primary">${total.toFixed(2)}</span></h4>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={closeModify} className=" text-sm px-2 py-1 bg-gray-200 rounded cursor-pointer hover:brightness-90 duration-300">Cancel</button>
                <button onClick={handleSave} className="text-sm px-2 py-1 bg-primary text-white rounded cursor-pointer hover:brightness-90 duration-300">Save</button>
              </div>
        </div>
    );
  };

  export default ModifyOrder;
  