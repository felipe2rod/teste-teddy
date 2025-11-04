import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AuthProvider, useAuthContext } from './auth/AuthProvider';
import type { JSX } from 'react';
import CustomersPage from './pages/CustomersPage';
import SelectedCustomersPage from './pages/SelectedCustomersPage';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <CustomersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/clientes-selecionados"
            element={
              <ProtectedRoute>
                <SelectedCustomersPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
