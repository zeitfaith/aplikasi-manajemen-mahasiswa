import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Statistik from "./pages/Statistik";
import Profil from "./pages/Profil";
import Home from "./pages/Home"; // Tambahkan import Home
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";
import { KegiatanProvider } from "./contexts/KegiatanContext";
import KegiatanForm from "./components/Kegiatan/KegiatanForm";
import KegiatanList from "./components/Kegiatan/KegiatanList";

const App = () => {
  return (
    <div className="app-wrapper">
      <AuthProvider>
        <KegiatanProvider>
          <Router>
            <Navbar />
            <Routes>
              {/* Landing page utama setelah login */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/statistik"
                element={
                  <ProtectedRoute>
                    <Statistik />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profil"
                element={
                  <ProtectedRoute>
                    <Profil />
                  </ProtectedRoute>
                }
              />
              {/* Redirect semua route tidak dikenal ke home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer />
          </Router>
        </KegiatanProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
