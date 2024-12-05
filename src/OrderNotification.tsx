import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
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
  
  const { role } = useAuth();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(storedOrders);
  }, []);

  const handleUpdateStatus = (id: number) => {
  const updatedOrders = orders.map((order) => {
    if (order.id === id) {
      let newStatus = order.status;
      if (order.status === 'Pending') 
      {
        newStatus = 'Preparing';
      }
      else if (order.status === 'Preparing') 
      {
        newStatus = 'Complete';
      }
      return { ...order, status: newStatus };
    }
    return order;
  });

  setOrders(updatedOrders);
  };

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
                {(role !== 'guest' && (
                  <button id="button-grid-button" onClick={() => handleUpdateStatus(order.id)}>Update</button>
                ))}
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
        <div id='return-button'>
          <button onClick={() => navigate('/launchpad')} className="back-button">
            Return to Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderNotification;
