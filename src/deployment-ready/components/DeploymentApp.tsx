import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "../components/new-commit/Header";
import Sidebar from "../components/Sidebar";
import StateTabs from "./StateTabs";
import MainContent from "../components/MainContent";
import AllotmentsPage from "./AllotmentsPage";
import ClosingRanksPage from "./ClosingRanksPage";
import SeatMatrixPage from "./SeatMatrixPage";
import FeeStipendBondPage from "./FeeStipendBondPage";
import ChoiceListsPage from "./ChoiceListsPage";
import AllCollegesPage from "./AllCollegesPage";
import ExploreSection from "./ExploreSection";
import NeetUGPage from "../../pages/NeetUGPage";
import NeetPGPage from "../../pages/NeetPGPage";
import INICETPage from "../../pages/INICETPage";
import ResultrankingPage from "../components/Resultrankingpage";
import CounsellingPage from "../components/counsellingpage";
import FAQPage from "../components/FAQPage";
import UniversitiesPage from "../components/UniversitiesPage";
import ProfilePage from "../components/ProfilePage";
import SupportPage from "../components/SupportPage";
import AIAssistant from "../components/AIAssistant";
import WhatsAppSupport from "../components/WhatsAppSupport";
import MobileBottomNav from "../components/MobileBottomNav";

/**
 * Deployment Ready App Component
 * Complete application with all features for Django server integration
 */
const DeploymentApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [currentNeetPage, setCurrentNeetPage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all-india");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showStateTabs, setShowStateTabs] = useState(true);

  const user = {
    name: "Madhav Deshmukh",
    email: "madhav.deshmukh@gmail.com",
    phone: "+91 9876543210",
    neetRank: "12,345",
    category: "General",
    state: "Maharashtra",
    avatar: "MD",
  };

  const handleSearchChange = (value: string) => {
    console.log("Search:", value);
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setCurrentNeetPage(null);
    setIsMobileMenuOpen(false);
  };

  const handleNeetNavigation = (page: string) => {
    setCurrentNeetPage(page);
    setActiveSection("neet");
    setIsMobileMenuOpen(false);
  };

  const handleBackToDashboard = () => {
    setActiveSection("home");
    setCurrentNeetPage(null);
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  const renderPageContent = () => {
    // NEET Pages
    if (currentNeetPage) {
      switch (currentNeetPage) {
        case "neet-ug":
          return <NeetUGPage />;
        case "neet-pg":
          return <NeetPGPage />;
        case "inicet":
          return <INICETPage />;
        default:
          return <NeetUGPage />;
      }
    }

    // Data Pages
    switch (activeSection) {
      case "allotments":
        return <AllotmentsPage onBack={handleBackToDashboard} />;
      case "closing-ranks":
        return <ClosingRanksPage onBack={handleBackToDashboard} />;
      case "seat-matrix":
        return <SeatMatrixPage onBack={handleBackToDashboard} />;
      case "fee-stipend-bond":
        return <FeeStipendBondPage onBack={handleBackToDashboard} />;
      case "choice-lists":
        return <ChoiceListsPage onBack={handleBackToDashboard} />;
      case "all-colleges":
        return <AllCollegesPage onBack={handleBackToDashboard} />;
      case "explore":
        return <ExploreSection onNavigate={handleSectionChange} />;
      case "results":
        return <ResultrankingPage onBack={handleBackToDashboard} />;
      case "counselling":
        return <CounsellingPage onBack={handleBackToDashboard} />;
      case "faq":
        return <FAQPage onBack={handleBackToDashboard} />;
      case "universities":
        return <UniversitiesPage onBack={handleBackToDashboard} />;
      case "profile":
        return <ProfilePage user={user} onBack={handleBackToDashboard} onLogout={() => {}} />;
      case "support":
        return <SupportPage onBack={handleBackToDashboard} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
            <Header
              onSearchChange={handleSearchChange}
              onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              isMobileMenuOpen={isMobileMenuOpen}
              user={user}
              onSectionChange={handleSectionChange}
              onNeetNavigation={handleNeetNavigation}
            />

            {/* State Tabs - Now Visible */}
            <StateTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              visible={showStateTabs}
            />

            <div className="flex relative">
              {/* Mobile Sidebar Overlay */}
              {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                  <div
                    className="fixed inset-0 bg-black/50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                  <Sidebar
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                    className="relative z-10 transform transition-transform duration-300 ease-in-out"
                    isCollapsed={false}
                    onToggleCollapse={() => {}}
                  />
                </div>
              )}

              {/* Main Content Area */}
              <div
                className="flex-1 flex flex-col min-h-screen"
                style={{
                  marginLeft: isSidebarCollapsed ? "64px" : "256px",
                  marginRight: "320px",
                }}
              >
                <MainContent activeTab={activeTab} />
              </div>
            </div>

            {/* Fixed Sidebar (Desktop) */}
            <Sidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              className="hidden lg:block"
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={toggleSidebar}
            />

            {/* Mobile Bottom Navigation */}
            <MobileBottomNav
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
            />

            {/* AI Assistant Widget */}
            <AIAssistant />

            {/* WhatsApp Support Widget */}
            <WhatsAppSupport />

            {/* Padding for mobile bottom nav */}
            <div className="lg:hidden h-20"></div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
      <Header
        onSearchChange={handleSearchChange}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        user={user}
        onSectionChange={handleSectionChange}
        onNeetNavigation={handleNeetNavigation}
      />

      {/* State Tabs - Now Visible for main dashboard */}
      {activeSection === "home" && (
        <StateTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          visible={showStateTabs}
        />
      )}

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-black/50"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <Sidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              className="relative z-10 transform transition-transform duration-300 ease-in-out"
              isCollapsed={false}
              onToggleCollapse={() => {}}
            />
          </div>
        )}

        {/* Page Content */}
        <div
          className={`flex-1 ${
            activeSection === "home" 
              ? `style={{ marginLeft: ${isSidebarCollapsed ? "64px" : "256px"}, marginRight: "320px" }}`
              : ""
          }`}
        >
          {renderPageContent()}
        </div>
      </div>

      {/* Fixed Sidebar (Desktop) - Only show on dashboard */}
      {activeSection === "home" && (
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          className="hidden lg:block"
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      {/* AI Assistant Widget */}
      <AIAssistant />

      {/* WhatsApp Support Widget */}
      <WhatsAppSupport />

      {/* Padding for mobile bottom nav */}
      <div className="lg:hidden h-20"></div>
    </div>
  );
};

export default DeploymentApp;