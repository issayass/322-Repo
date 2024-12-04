import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

interface Order {
  id: number;
  items: { name: string; price: number; quantity: number }[];
  subtotal: string;
  status: string;
}

const OrderNotification: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  return (
    <div id="wrapper">
      <div id="component">
        <h1>Order Notifications</h1>
        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <h2>Order #{order.id}</h2>
                <p>Status: {order.status}</p>
                <p>Subtotal: ${order.subtotal}</p>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x {item.quantity} - ${item.price * item.quantity}
                    </li>
                  ))}
                </ul>
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

export default OrderNotification;
