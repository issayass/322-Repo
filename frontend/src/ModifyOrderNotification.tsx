import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axiosInstance from './axiosInstance';
import { useAuth } from './AuthContext';

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

const statuses = ['Received', 'Failed', 'Pending', 'Delivering', 'Completed'];

const ModifyOrderNotification: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<{ [key: number]: string }>({});
  const { authToken, role } = useAuth();

  const fetchOrders = async () => {
    if (!authToken) return;
    try {
      const response = await axiosInstance.get('/orders');
      setOrders(response.data);
      console.log('Fetched orders:', response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [authToken]);

  const handleStatusSelect = (orderId: number, newStatus: string) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: newStatus }));
  };

  const handleUpdateStatus = async (orderId: number) => {
    const newStatus = selectedStatus[orderId];
    if (!newStatus) {
      alert('Please select a status before updating.');
      return;
    }

    try {
      const response = await axiosInstance.put(`/orders/${orderId}`, { status: newStatus });
      setOrders((prev) => prev.map((o) => (o.id === orderId ? response.data : o)));
      alert('Order status updated successfully.');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status.');
    }
  };

  if (role !== 'admin') {
    return (
      <div id="wrapper">
        <div id="component">
          <h1>Access Denied</h1>
          <p>You must be an admin to modify order notifications.</p>
          <button onClick={() => navigate('/launchpad')} className="back-button">
            Return to Main Menu
          </button>
        </div>
      </div>
    );
  }

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
                  value={selectedStatus[order.id] || order.status}
                  onChange={(e) => handleStatusSelect(order.id, e.target.value)}
                >
                  {statuses.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
                <button
                  className="general-button"
                  onClick={() => handleUpdateStatus(order.id)}
                  style={{ marginLeft: '10px' }}
                >
                  Update Status
                </button>
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
