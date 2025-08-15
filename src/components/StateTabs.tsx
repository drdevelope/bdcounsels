import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X, Building2 } from "lucide-react";

interface StateTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onStateSelect: (state: string) => void;
}

const StateTabs: React.FC<StateTabsProps> = ({ activeTab, onTabChange, onStateSelect }) => {
  const [openTabs, setOpenTabs] = useState<string[]>(["all-india"]);
  const [showAddModal, setShowAddModal] = useState(false);

  const availableStates = [
    {
      id: "all-india",
      label: "All India Counselling - PG Medical",
      shortLabel: "All India - PG Medical",
      icon: "🏥",
      color: "from-orange-500 to-red-600",
      colleges: 245,
    },
    {
      id: "andhra-govt",
      label: "Andhra Pradesh Government Quota - PG Medical",
      shortLabel: "Andhra Pradesh Govt",
      icon: "🏛️",
      color: "from-green-500 to-teal-600",
      colleges: 89,
    },
    {
      id: "andhra-mgmt",
      label: "Andhra Pradesh Management Quota - PG Medical",
      shortLabel: "Andhra Pradesh Mgmt",
      icon: "🏥",
      color: "from-blue-500 to-indigo-600",
      colleges: 45,
    },
    {
      id: "maharashtra",
      label: "Maharashtra - PG Medical",
      shortLabel: "Maharashtra - PG",
      icon: "🏥",
      color: "from-purple-500 to-pink-600",
      colleges: 156,
    },
    {
      id: "karnataka",
      label: "Karnataka - PG Medical",
      shortLabel: "Karnataka Medical",
      icon: "🏥",
      color: "from-indigo-500 to-blue-600",
      colleges: 134,
    },
    {
      id: "delhi",
      label: "Delhi - PG Medical",
      shortLabel: "Delhi PG",
      icon: "🏛️",
      color: "from-red-500 to-rose-600",
      colleges: 67,
    },
    {
      id: "gujarat",
      label: "Gujarat - PG Medical",
      shortLabel: "Gujarat PG",
      icon: "🏥",
      color: "from-yellow-500 to-orange-600",
      colleges: 78,
    },
    {
      id: "tamil-nadu-govt",
      label: "Tamil Nadu Government Quota - PG Medical",
      shortLabel: "Tamil Nadu Govt",
      icon: "🏥",
      color: "from-teal-500 to-cyan-600",
      colleges: 123,
    },
    {
      id: "west-bengal",
      label: "West Bengal - PG Medical",
      shortLabel: "West Bengal PG",
      icon: "🏥",
      color: "from-emerald-500 to-green-600",
      colleges: 98,
    },
  ];

  const addTab = (stateId: string) => {
    if (!openTabs.includes(stateId)) {
      setOpenTabs([...openTabs, stateId]);
    }
    onTabChange(stateId);
    setShowAddModal(false);
  };

  const removeTab = (stateId: string) => {
    if (openTabs.length > 1) {
      const newTabs = openTabs.filter(tab => tab !== stateId);
      setOpenTabs(newTabs);
      if (activeTab === stateId) {
        onTabChange(newTabs[0]);
      }
    }
  };

  const getStateData = (stateId: string) => {
    return availableStates.find(state => state.id === stateId);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-sm px-4 py-3 lg:px-6 lg:py-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-slate-100 rounded-xl transition-colors hidden lg:block">
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>

          <div className="flex items-center space-x-2 lg:space-x-3 overflow-x-auto scrollbar-hide">
            {openTabs.map((tabId) => {
              const stateData = getStateData(tabId);
              if (!stateData) return null;
              
              return (
                <div key={tabId} className="flex items-center space-x-1">
                  <button
                    onClick={() => {
                      onTabChange(tabId);
                      onStateSelect(tabId);
                    }}
                    className={`flex items-center space-x-2 lg:space-x-3 px-3 py-2 lg:px-4 lg:py-3 rounded-xl whitespace-nowrap transition-all duration-300 transform hover:scale-105 text-sm lg:text-base ${
                      activeTab === tabId
                        ? `bg-gradient-to-r ${stateData.color} text-white shadow-lg`
                        : "text-slate-700 hover:bg-slate-50 border border-slate-200"
                    }`}
                  >
                    <span className="text-base lg:text-lg">{stateData.icon}</span>
                    <span className="font-medium">
                      <span className="lg:hidden">{stateData.shortLabel}</span>
                      <span className="hidden lg:inline">{stateData.label}</span>
                    </span>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      {stateData.colleges}
                    </span>
                  </button>
                  
                  {openTabs.length > 1 && (
                    <button
                      onClick={() => removeTab(tabId)}
                      className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="w-3 h-3 text-red-500" />
                    </button>
                  )}
                </div>
              );
            })}
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

      {/* Add Tab Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Add State Tab</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {availableStates
                  .filter(state => !openTabs.includes(state.id))
                  .map((state) => (
                    <button
                      key={state.id}
                      onClick={() => addTab(state.id)}
                      className="w-full text-left p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{state.icon}</span>
                          <div>
                            <h4 className="font-medium text-slate-800">{state.label}</h4>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <Building2 className="w-3 h-3" />
                              <span>{state.colleges} colleges</span>
                            </div>
                          </div>
                        </div>
                        <Plus className="w-4 h-4 text-slate-400" />
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateTabs;