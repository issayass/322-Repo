import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

interface Order {
  id: number;
  items: { name: string; price: number; quantity: number }[];
  subtotal: string;
  status: string;
}

const statuses = ['Received', 'Failed', 'Pending', 'Delivering', 'Completed'];

const ModifyOrderNotification: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const handleUpdateStatus = (orderId: number, newStatus: string) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  return (
    <div id="wrapper">
      <div id="component">
        <h1>Modify Order Notifications</h1>
        {orders.length === 0 ? (
          <p>No orders to modify.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <h2>Order #{order.id}</h2>
                <p>Current Status: {order.status}</p>
                <p>Subtotal: ${order.subtotal}</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x {item.quantity} - ${item.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <label htmlFor={`status-${order.id}`}>Update Status:</label>
                <select
                  id={`status-${order.id}`}
                  value={order.status}
                  onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => navigate('/launchpad')} className="back-button">
          Return to Main Menu
        </button>
      </div>
    </div>
  );
};

export default ModifyOrderNotification;
