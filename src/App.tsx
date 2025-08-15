import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Main Pages
import DashboardPage from "./pages/DashboardPage";
import DashboardProfilePage from "./pages/DashboardProfilePage";

// NEET PG Pages (UG commented for NEET PG focus)
// import NeetUGPage from "./pages/NeetUGPage"; // Commented for NEET PG focus
import NeetPGPage from "./pages/NeetPGPage";
// import INICETPage from "./pages/INICETPage"; // Hidden as requested
import Homepage from "./pages/Homepage";

// Data Pages
import AllotmentsPage from "./pages/AllotmentsPage";
import ClosingRanksPage from "./pages/ClosingRanksPage";
import SeatMatrixPage from "./pages/SeatMatrixPage";
import FeeStipendBondPage from "./pages/FeeStipendBondPage";
import StateTabs from "./components/StateTabs";

// Component Pages
import FAQPage from "./components/FAQPage";
import SupportPage from "./components/SupportPage";
import UniversitiesPage from "./components/UniversitiesPage";
import MedicalCollegesPage from "./components/MedicalCollegesPage";
import ResultrankingPage from "./components/Resultrankingpage";
import CounsellingPage from "./components/Counsellingpage";

// New Pages
import ChoiceListsPage from "./pages/ChoiceListsPage";
import LatestNewsPage from "./pages/LatestNewsPage";

// Predictor Pages (UG commented for NEET PG focus)
// import UGPredictorPage from "./pages/UGPredictorPage"; // Commented for NEET PG focus
import PGPredictorPage from "./pages/PGPredictorPage";

/**
 * Main App Component with React Router
 * Restructured for NEET PG focus with proper authentication flow and navigation
 * All routes are properly organized with API integration comments
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <DashboardProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Choice Lists and News Pages */}
          <Route
            path="/choice-lists"
            element={
              <ProtectedRoute>
                <ChoiceListsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/latest-news"
            element={
              <ProtectedRoute>
                <LatestNewsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          {/* NEET PG Exam Routes - API Integration: /api/neet/ */}
          <Route
            path="/neet-pg"
            element={
              <ProtectedRoute>
                <NeetPGPage />
              </ProtectedRoute>
            }
          />
          
          {/* UG Routes commented for NEET PG focus */}
          {/* <Route
            path="/neet-ug"
            element={
              <ProtectedRoute>
                <NeetUGPage />
              </ProtectedRoute>
            }
          /> */}
          
          {/* INICET hidden as requested */}
          {/* <Route
            path="/inicet"
            element={
              <ProtectedRoute>
                <INICETPage />
              </ProtectedRoute>
            }
          /> */}

          {/* Predictor Routes - API Integration: /api/predictor/ */}
          <Route
            path="/predictor/pg"
            element={
              <ProtectedRoute>
                <PGPredictorPage />
              </ProtectedRoute>
            }
          />
          
          {/* UG Predictor commented for NEET PG focus */}
          {/* <Route
            path="/predictor/ug"
            element={
              <ProtectedRoute>
                <UGPredictorPage />
              </ProtectedRoute>
            }
          /> */}

          {/* Data Pages Routes - API Integration: /api/neet/ */}
          <Route
            path="/allotments"
            element={
              <ProtectedRoute>
                <AllotmentsPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/closing-ranks"
            element={
              <ProtectedRoute>
                <ClosingRanksPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seat-matrix"
            element={
              <ProtectedRoute>
                <SeatMatrixPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/fee-stipend-bond"
            element={
              <ProtectedRoute>
                <FeeStipendBondPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          {/* Information Pages - API Integration: Various endpoints */}
          <Route
            path="/faq"
            element={
              <ProtectedRoute>
                <FAQPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <SupportPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/universities"
            element={
              <ProtectedRoute>
                <UniversitiesPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/medical-colleges"
            element={
              <ProtectedRoute>
                <MedicalCollegesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/rankings"
            element={
              <ProtectedRoute>
                <ResultrankingPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/counselling"
            element={
              <ProtectedRoute>
                <CounsellingPage onBack={() => window.history.back()} />
              </ProtectedRoute>
            }
          />

          {/* Default Routes */}
          <Route path="/" element={<Homepage />} />     
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;