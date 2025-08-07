import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import DeploymentApp from "./DeploymentApp";
import AllotmentsPage from "../pages/AllotmentsPage";
import ClosingRanksPage from "../pages/ClosingRanksPage";
import SeatMatrixPage from "../pages/SeatMatrixPage";
import FeeStipendBondPage from "../pages/FeeStipendBondPage";
import ChoiceListsPage from "../pages/ChoiceListsPage";
import AllCollegesPage from "../pages/AllCollegesPage";
import NeetUGPage from "../../pages/NeetUGPage";
import NeetPGPage from "../../pages/NeetPGPage";
import INICETPage from "../../pages/INICETPage";
import ResultrankingPage from "../../components/Resultrankingpage";
import CounsellingPage from "../../components/counsellingpage";
import FAQPage from "../../components/FAQPage";
import UniversitiesPage from "../../components/UniversitiesPage";
import ProfilePage from "../../components/ProfilePage";
import SupportPage from "../../components/SupportPage";

/**
 * Deployment Ready Router Component
 * Complete routing system for Django server integration
 */
const DeploymentRouter: React.FC = () => {
  const handleBack = () => window.history.back();

  const demoUser = {
    name: "Madhav Deshmukh",
    email: "madhav.deshmukh@gmail.com",
    phone: "+91 9876543210",
    neetRank: "12,345",
    category: "General",
    state: "Maharashtra",
    avatar: "MD",
  };

  return (
    <Router>
      <Routes>
        {/* Main Dashboard */}
        <Route path="/" element={<DeploymentApp />} />
        
        {/* NEET Exam Pages */}
        <Route path="/neet-ug" element={<NeetUGPage />} />
        <Route path="/neet-pg" element={<NeetPGPage />} />
        <Route path="/inicet" element={<INICETPage />} />

        {/* Data Pages with Enhanced UI */}
        <Route path="/allotments" element={<AllotmentsPage onBack={handleBack} />} />
        <Route path="/closing-ranks" element={<ClosingRanksPage onBack={handleBack} />} />
        <Route path="/seat-matrix" element={<SeatMatrixPage onBack={handleBack} />} />
        <Route path="/fee-stipend-bond" element={<FeeStipendBondPage onBack={handleBack} />} />
        
        {/* Choice Lists and Colleges */}
        <Route path="/choice-lists" element={<ChoiceListsPage onBack={handleBack} />} />
        <Route path="/all-colleges" element={<AllCollegesPage onBack={handleBack} />} />
        
        {/* Results and Rankings */}
        <Route path="/results" element={<ResultrankingPage onBack={handleBack} />} />
        <Route path="/resultranking" element={<ResultrankingPage onBack={handleBack} />} />
        
        {/* Counselling */}
        <Route path="/counselling" element={<CounsellingPage onBack={handleBack} />} />
        
        {/* Other Pages */}
        <Route path="/faq" element={<FAQPage onBack={handleBack} />} />
        <Route path="/universities" element={<UniversitiesPage onBack={handleBack} />} />
        <Route path="/profile" element={<ProfilePage user={demoUser} onBack={handleBack} onLogout={() => {}} />} />
        <Route path="/support" element={<SupportPage onBack={handleBack} />} />

        {/* Quota Pages */}
        <Route path="/management-quota" element={<AllCollegesPage onBack={handleBack} />} />
        <Route path="/state-quota" element={<AllCollegesPage onBack={handleBack} />} />
        
        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default DeploymentRouter;