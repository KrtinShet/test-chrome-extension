import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import ProtectedRoutes from './Components/ProtectedRoutes';

import LoginPage from './Routes/LoginPage';
import SignupPage from './Routes/Signuppage';
import CounterPage from './Routes/CounterPage';

const AppLayout = () => {
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<CounterPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
};

export default AppLayout;
