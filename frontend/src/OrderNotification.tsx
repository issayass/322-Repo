import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './style.css';
import axiosInstance from './axiosInstance';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: number;
  items: OrderItem[];
  subtotal: string;
  status: string;
}

const OrderNotification: React.FC = () => {
  const navigate = useNavigate();
  const { role, authToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    if (!authToken) return;
    try {
      const response = await axiosInstance.get('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [authToken]);

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
