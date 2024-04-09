import React from 'react';
import moment from 'moment';

const ViewOrdersTable = ({ order }) => {
  console.log(order)
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Product x Quantity</th>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Total Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {order.map((orderItem) => (
            <tr key={orderItem.id} className="border-b border-gray-200">
              <td className="px-4 py-2">
                {orderItem.user.name} ({orderItem.user.email})
              </td>
              <td className="px-4 py-2">
                <ul>
                  {orderItem.items.map((item) => (
                    <li key={item.id}>
                      {item.product.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">{orderItem.address}</td>
              <td className="px-4 py-2">${orderItem.totalAmount.toFixed(2)}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded-full font-semibold ${
                    orderItem.status === 'PENDING'
                      ? 'bg-yellow-200 text-yellow-800'
                      : orderItem.status === 'DELIVERED'
                      ? 'bg-green-200 text-green-800'
                      : 'bg-red-200 text-red-800'
                  }`}
                >
                  {orderItem.status}
                </span>
              </td>
              <td className="px-4 py-2">
                {moment(orderItem.createdAt).format('YYYY-MM-DD HH:mm')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewOrdersTable;
