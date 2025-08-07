import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

/**
 * StateTabs Component Props Interface
 */
interface StateTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

/**
 * Enhanced StateTabs Component
 * Multiple tab support with add/remove functionality
 */
const StateTabs: React.FC<StateTabsProps> = ({ activeTab, onTabChange }) => {
  const [openTabs, setOpenTabs] = useState([
    {
      id: "all-india",
      label: "All India Counselling - UG Medical",
      shortLabel: "All India - UG Medical",
      icon: "🏥",
      color: "from-orange-500 to-red-600",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);

  // Available tabs to add
  const availableTabs = [
    {
      id: "andhra",
      label: "Andhra Pradesh Management Quota",
      shortLabel: "Andhra Pradesh Mgmt",
      icon: "🏛️",
      color: "from-green-500 to-teal-600",
    },
    {
      id: "assam",
      label: "Assam - UG Medical",
      shortLabel: "Assam - UG Medical",
      icon: "🏥",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: "maharashtra",
      label: "Maharashtra - UG Medical",
      shortLabel: "Maharashtra - UG",
      icon: "🏥",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: "karnataka",
      label: "Karnataka - Medical Counselling",
      shortLabel: "Karnataka Medical",
      icon: "🏥",
      color: "from-indigo-500 to-blue-600",
    },
    {
      id: "tamil-nadu",
      label: "Tamil Nadu - UG Medical",
      shortLabel: "Tamil Nadu - UG",
      icon: "🏥",
      color: "from-pink-500 to-rose-600",
    },
    {
      id: "delhi",
      label: "Delhi - UG Medical",
      shortLabel: "Delhi - UG",
      icon: "🏥",
      color: "from-cyan-500 to-blue-600",
    },
  ];

  const addTab = (tab: any) => {
    if (!openTabs.find(t => t.id === tab.id)) {
      setOpenTabs([...openTabs, tab]);
    }
    setShowAddModal(false);
  };

  const removeTab = (tabId: string) => {
    if (openTabs.length > 1) {
      setOpenTabs(openTabs.filter(tab => tab.id !== tabId));
      if (activeTab === tabId) {
        onTabChange(openTabs[0].id);
      }
    }
  };

  return (
    <>
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-16 z-30">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors hidden lg:block">
              <ChevronLeft className="w-5 h-5 text-slate-600" />
            </button>

            <div className="flex items-center space-x-2 lg:space-x-3 overflow-x-auto scrollbar-hide">
              {openTabs.map((tab) => (
                <div key={tab.id} className="relative group">
                  <button
                    onClick={() => onTabChange(tab.id)}
                    className={`flex items-center space-x-2 lg:space-x-3 px-3 py-2 lg:px-4 lg:py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 text-sm lg:text-base ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                        : "text-slate-700 hover:bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <span className="text-base lg:text-lg">{tab.icon}</span>
                    <span className="font-medium">
                      <span className="lg:hidden">{tab.shortLabel}</span>
                      <span className="hidden lg:inline">{tab.label}</span>
                    </span>
                    {openTabs.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTab(tab.id);
                        }}
                        className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors hidden lg:block">
              <ChevronRight className="w-5 h-5 text-slate-600" />
            </button>
          </div>

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-2 lg:px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline text-sm font-medium">Add Tab</span>
          </button>
        </div>
      </div>

      {/* Add Tab Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Add New Tab</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {availableTabs
                  .filter(tab => !openTabs.find(t => t.id === tab.id))
                  .map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => addTab(tab)}
                      className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-3"
                    >
                      <span className="text-lg">{tab.icon}</span>
                      <div>
                        <div className="font-medium text-gray-800">{tab.label}</div>
                        <div className="text-sm text-gray-600">Medical Counselling</div>
                      </div>
                    </button>
                  ))}
              </div>

              {availableTabs.filter(tab => !openTabs.find(t => t.id === tab.id)).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  All available tabs are already open
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StateTabs;