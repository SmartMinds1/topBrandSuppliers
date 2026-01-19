//Handling client orders
const OrdersTable = ({ orders, onModify }) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full shadow-lg">
          <thead className="bg-bg text-left">
            <tr>
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2">Items</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
  
          <tbody>
            { orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                ) : (
              orders.map((order) => (
              <tr key={order.id} className="">
                <td className="p-2 text-xs">{order.id}</td>
  
                <td className="p-2 text-sm">
                  {order.items.length} items
                </td>
  
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold
                      ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "shipping"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>
  
                <td className="p-2 text-xs">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
  
                <td className="p-2">
                  {order.status === "pending" ? (
                    <button
                      onClick={() => onModify(order.id)}
                      className="text-sm bg-primary text-white px-3 py-1 rounded"
                    >
                      Modify
                    </button>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Locked
                    </span>
                  )}
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
    );
  };
  export default OrdersTable;
  