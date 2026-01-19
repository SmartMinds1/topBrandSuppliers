import React, {useState} from "react";

const ModifyOrder = ({ order, closeModify, onSave }) => {
    const [items, setItems] = useState(order.items);
  
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
  
    const total = items.reduce((sum, x) => sum + x.price * x.sizeKg * x.qty, 0);
  
    const handleSave = () => {
      onSave({ ...order, items }); // send back modified order
      onClose();
    };
  
    return (
        <div className="bg-white p-6 w-75 sm:w-90 h-100 sm:h-120 rounded-md">
          <h3 className="text-lg font-bold mb-4">Modify Order</h3>
  
          {items.map(item => (
            <div key={`${item.id}_${item.sizeKg}`} className="flex justify-between items-center mb-2">
              <div>
                <p>{item.title} ({item.sizeKg}kg)</p>
                <p>${(item.price * item.qty * item.sizeKg).toFixed(2)}</p>
              </div>
              <div className="flex gap-1 items-center">
                <button onClick={() => decreaseQty(item.id, item.sizeKg)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id, item.sizeKg)}>+</button>
              </div>
            </div>
          ))}
  
          <h4>Total: ${total.toFixed(2)}</h4>
  
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={closeModify} className="px-3 py-1 bg-gray-200 rounded">Cancel</button>
            <button onClick={handleSave} className="px-3 py-1 bg-primary text-white rounded">Save</button>
          </div>
        </div>
    );
  };

  export default ModifyOrder;
  