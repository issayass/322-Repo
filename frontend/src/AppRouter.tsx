import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login.tsx';
import LaunchPad from './Launchpad.tsx';
import Menu from './Menu';
import Inventory from './Inventory.tsx';
import Cart from './Cart';
import PrivateRoute from './PrivateRoute';
import Register from './Register';
import CustomizeDish from './CustomizeDish.tsx';
import CartConfirmation from './CartConfirmation';
import OrderNotification from './OrderNotification';
import ModifyOrderNotification from './ModifyOrderNotification'; // Import the new component

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/launchpad"
        element={
          <PrivateRoute>
            <LaunchPad />
          </PrivateRoute>
        }
      />
      <Route
        path="/menu"
        element={
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        }
      />
      <Route
        path='/customizedish'
        element={
          <PrivateRoute>
            <CustomizeDish />
          </PrivateRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <PrivateRoute>
            <Inventory />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        }
      />
      <Route
        path="/cart-confirmation"
        element={
          <PrivateRoute>
            <CartConfirmation />
          </PrivateRoute>
        }
      />
      <Route
        path="/order-notification"
        element={
          <PrivateRoute>
            <OrderNotification />
          </PrivateRoute>
        }
      />
      <Route
        path="/modify-order-notification"
        element={
          <PrivateRoute>
            <ModifyOrderNotification />
          </PrivateRoute>
        }
      />
      {/* Catch-all route to handle unknown paths */}
      <Route path="*" element={<Navigate to="/launchpad" replace />} />
    </Routes>
  );
};

export default AppRouter;
