import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import ProtectedRoute from './components/ProtectedRoute';
import OfflineTherapy from './pages/OfflineTherapy';
import OnlineTherapy from './pages/OnlineTherapy';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Landing />} />
            <Route path="/offline" element={<OfflineTherapy />} />
            <Route path="/online" element={<OnlineTherapy />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
