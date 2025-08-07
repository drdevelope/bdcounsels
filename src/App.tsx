import React, { useState } from "react";
import Header from "./components/new-commit/Header";
import Sidebar from "./components/Sidebar";
import StateTabs from "./components/StateTabs";
import MainContent from "./components/MainContent";
import NeetUGPage from "./pages/NeetUGPage";
import NeetPGPage from "./pages/NeetPGPage";
import AllotmentsPage from "./pages/AllotmentsPage";
import ClosingRanksPage from "./pages/ClosingRanksPage";
import SeatMatrixPage from "./pages/SeatMatrixPage";
import FeeStipendBondPage from "./pages/FeeStipendBondPage";
import ChoiceLists from "./components/ChoiceLists";
import MobileBottomNav from "./components/MobileBottomNav";
import PlaceholderContent from "./components/PlaceholderContent";
import ProfilePage from "./components/ProfilePage";
import SupportPage from "./components/SupportPage";
import FAQPage from "./components/FAQPage";
import UniversitiesPage from "./components/UniversitiesPage";
import ResultrankingPage from "./components/Resultrankingpage";
import CounsellingPage from "./components/Counsellingpage";
import AIAssistant from "./components/AIAssistant";
import WhatsAppSupport from "./components/WhatsAppSupport";
import { AuthProvider } from "./contexts/AuthContext";

/**
 * Enhanced App Component with Complete Navigation and Mandatory Sidebar
 * Updated with proper routing for all data pages and predictor tools
 */
function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [currentNeetPage, setCurrentNeetPage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all-india");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Demo user
  const [user] = useState({
    name: "Madhav Deshmukh",
    email: "madhav.deshmukh@gmail.com",
    phone: "+91 9876543210",
    neetRank: "12,345",
    category: "General",
    state: "Maharashtra",
    avatar: "MD",
  });

  const handleSearchChange = (value: string) => {
    console.log("Search:", value);
  };

  const handleSectionChange = (section: string) => {
    // Handle data pages
    if (
      section === "allotments" ||
      section === "closing-ranks" ||
      section === "seat-matrix" ||
      section === "fee-stipend-bond" ||
      section === "profile" ||
      section === "support" ||
      section === "faq" ||
      section === "universities" ||
      section === "results" ||
      section === "Counselling" ||
      section === "home" ||
      section === "neet-ug-predictor" ||
      section === "neet-pg-predictor"
    ) {
      setShowPlaceholder(false);
      setCurrentNeetPage(null);
    } else {
      setShowPlaceholder(true);
      setCurrentNeetPage(null);
    }
    setActiveSection(section);
    setIsMobileMenuOpen(false);
  };

  const handleNeetNavigation = (page: string) => {
    setCurrentNeetPage(page);
    setActiveSection("neet");
    setShowPlaceholder(false);
    setIsMobileMenuOpen(false);
  };

  const handleBackToDashboard = () => {
    setShowPlaceholder(false);
    setCurrentNeetPage(null);
    setActiveSection("home");
  };

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  /**
   * Enhanced Content Rendering with All Pages
   */
  const renderPageContent = () => {
    // NEET Pages
    if (currentNeetPage) {
      switch (currentNeetPage) {
        case "neet-ug":
          return <NeetUGPage />;
        case "neet-pg":
          return <NeetPGPage />;
        default:
          return <NeetUGPage />;
      }
    }

    // Data pages
    if (activeSection === "allotments") {
      return <AllotmentsPage onBack={handleBackToDashboard} />;
    }

    if (activeSection === "closing-ranks") {
      return <ClosingRanksPage onBack={handleBackToDashboard} />;
    }

    if (activeSection === "seat-matrix") {
      return <SeatMatrixPage onBack={handleBackToDashboard} />;
    }

    if (activeSection === "fee-stipend-bond") {
      return <FeeStipendBondPage onBack={handleBackToDashboard} />;
    }

    // Other pages
    if (activeSection === "results") {
      return <ResultrankingPage onBack={handleBackToDashboard} />;
    }

    if (activeSection === "Counselling") {
      return <CounsellingPage onBack={handleBackToDashboard} />;
    }

    if (activeSection === "profile") {
      return (
        <ProfilePage
          user={user}
          onBack={handleBackToDashboard}
          onLogout={() => {}}
        />
      );
    }

    if (activeSection === "support") {
      return <SupportPage onBack={handleBackToDashboard} />;
    }

    if (activeSection === "faq") {
      return <FAQPage onBack={handleBackToDashboard} />;
    }

    if (activeSection === "universities") {
      return <UniversitiesPage onBack={handleBackToDashboard} />;
    }

    // Predictor pages
    if (activeSection === "neet-ug-predictor" || activeSection === "neet-pg-predictor") {
      return (
        <PlaceholderContent
          title={`${activeSection === "neet-ug-predictor" ? "NEET UG" : "NEET PG"} Predictor`}
          onBack={handleBackToDashboard}
        />
      );
    }

    // Placeholder for unknown sections
    if (showPlaceholder) {
      return (
        <PlaceholderContent
          title={`${
            activeSection.charAt(0).toUpperCase() + activeSection.slice(1)
          } Section`}
          onBack={handleBackToDashboard}
        />
      );
    }

    // Main dashboard content
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

        {/* State Tabs - Visible on Dashboard */}
        <StateTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
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

        {/* Choice Lists (Right sidebar) */}
        <ChoiceLists />

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

  // For all other pages, render with mandatory sidebar
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
        <Header
          onSearchChange={handleSearchChange}
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          user={user}
          onSectionChange={handleSectionChange}
          onNeetNavigation={handleNeetNavigation}
        />

        {/* State Tabs - Only show on dashboard */}
        {activeSection === "home" && (
          <StateTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
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
                ? ""
                : ""
            }`}
            style={{ 
              marginLeft: activeSection === "home" 
                ? (isSidebarCollapsed ? "64px" : "256px") 
                : "0px" 
            }}
          >
            {renderPageContent()}
          </div>
        </div>

        {/* Mandatory Sidebar for All Sections */}
        <Sidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          className="hidden lg:block"
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />

        {/* Choice Lists - Only show on dashboard */}
        {activeSection === "home" && <ChoiceLists />}

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
    </AuthProvider>
  );
}

export default App;