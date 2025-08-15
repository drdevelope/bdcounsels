import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Plus
} from "lucide-react";

interface StateTabsPGProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const states = [
  { id: "all-india", label: "All India Counseling - PG Medical", icon: "🌍", color: "from-orange-500 to-red-600" },
  { id: "andhra-govt", label: "Andhra Pradesh Government Quota - PG Medical", icon: "🏛️", color: "from-green-500 to-emerald-600" },
  { id: "andhra-mgmt", label: "Andhra Pradesh Management Quota - PG Medical", icon: "🏥", color: "from-green-500 to-teal-600" },
  { id: "afms", label: "Armed Forces Medical Services - PG Medical", icon: "🎖️", color: "from-yellow-500 to-amber-600" },
  { id: "assam", label: "Assam - PG Medical", icon: "🏥", color: "from-blue-500 to-indigo-600" },
  { id: "bihar", label: "Bihar - PG Medical", icon: "🏥", color: "from-pink-500 to-fuchsia-600" },
  { id: "chandigarh", label: "Chandigarh - PG Medical", icon: "🏥", color: "from-purple-500 to-violet-600" },
  { id: "chhattisgarh", label: "Chhattisgarh - PG Medical", icon: "🏥", color: "from-lime-500 to-green-600" },
  { id: "cps", label: "CPS - PG Medical", icon: "📘", color: "from-gray-500 to-slate-600" },
  { id: "delhi", label: "Delhi - PG Medical", icon: "🏥", color: "from-red-500 to-rose-600" },
  { id: "dnb-inservice", label: "DNB - Inservice Seats - PG Medical", icon: "📘", color: "from-blue-400 to-blue-600" },
  { id: "dnb-pdcet", label: "DNB - PDCET - PG Medical", icon: "📗", color: "from-emerald-500 to-green-600" },
  { id: "dnb-sponsored", label: "DNB Sponsored - PG Medical", icon: "📘", color: "from-purple-500 to-indigo-600" },
  { id: "goa", label: "Goa - PG Medical", icon: "🏖️", color: "from-teal-500 to-cyan-600" },
  { id: "gujarat", label: "Gujarat - PG Medical", icon: "🏥", color: "from-pink-400 to-rose-500" },
  { id: "haryana", label: "Haryana - PG Medical", icon: "🏥", color: "from-blue-500 to-indigo-600" },
  { id: "himachal", label: "Himachal Pradesh - PG Medical", icon: "🏔️", color: "from-cyan-500 to-sky-600" },
  { id: "jammu", label: "Jammu and Kashmir - PG Medical", icon: "❄️", color: "from-blue-500 to-indigo-600" },
  { id: "jharkhand", label: "Jharkhand - PG Medical", icon: "🏥", color: "from-orange-500 to-yellow-500" },
  { id: "karnataka", label: "Karnataka - PG Medical", icon: "🏥", color: "from-indigo-500 to-blue-600" },
  { id: "kerala", label: "Kerala - PG Medical", icon: "🌴", color: "from-green-500 to-emerald-600" },
  { id: "madhya", label: "Madhya Pradesh - PG Medical", icon: "🏥", color: "from-purple-500 to-pink-600" },
  { id: "maharashtra", label: "Maharashtra - PG Medical", icon: "🏥", color: "from-yellow-500 to-orange-600" },
  { id: "manipur-jnims", label: "Manipur-JNIMS - PG Medical", icon: "🏥", color: "from-cyan-500 to-blue-600" },
  { id: "manipur-rims", label: "Manipur-RIMS - PG Medical", icon: "🏥", color: "from-teal-400 to-green-600" },
  { id: "neigrihms", label: "NEIGRIHMS - PG Medical", icon: "🏥", color: "from-pink-500 to-rose-600" },
  { id: "odisha", label: "Odisha - PG Medical", icon: "🏥", color: "from-orange-400 to-red-500" },
  { id: "open-states", label: "Open States (Private Institute Seats)", icon: "🏫", color: "from-purple-500 to-pink-600" },
  { id: "pondicherry", label: "Pondicherry - PG Medical", icon: "🌊", color: "from-indigo-500 to-purple-600" },
  { id: "punjab", label: "Punjab - PG Medical", icon: "🌾", color: "from-green-600 to-lime-500" },
  { id: "rajasthan", label: "Rajasthan - PG Medical", icon: "🏜️", color: "from-yellow-500 to-amber-600" },
  { id: "sikkim", label: "Sikkim - PG Medical", icon: "🏔️", color: "from-blue-500 to-indigo-600" },
  { id: "tn-dnb", label: "Tamil Nadu DNB Inservice - PG Medical", icon: "📘", color: "from-rose-500 to-pink-600" },
  { id: "tn-govt", label: "Tamil Nadu Government Quota - PG Medical", icon: "🏥", color: "from-green-500 to-teal-600" },
  { id: "tn-mgmt", label: "Tamil Nadu Management Quota - PG Medical", icon: "🏥", color: "from-orange-400 to-red-500" },
  { id: "telangana-govt", label: "Telangana Government Quota - PG Medical", icon: "🏥", color: "from-violet-500 to-indigo-600" },
  { id: "telangana-mgmt", label: "Telangana Management Quota - PG Medical", icon: "🏥", color: "from-fuchsia-500 to-pink-600" },
  { id: "tripura", label: "Tripura - PG Medical", icon: "🏥", color: "from-emerald-500 to-green-600" },
  { id: "uttarakhand", label: "Uttarakhand - PG Medical", icon: "🏞️", color: "from-blue-500 to-cyan-600" },
  { id: "uttar-pradesh", label: "Uttar Pradesh - PG Medical", icon: "🏥", color: "from-yellow-500 to-orange-600" },
  { id: "west-bengal", label: "West Bengal - PG Medical", icon: "🏥", color: "from-indigo-500 to-purple-600" },
];

const StateTabsPG: React.FC<StateTabsPGProps> = ({ activeTab, onTabChange }) => {
  const [showDrawer, setShowDrawer] = useState(false);

  return (
    <div className="w-full max-w-screen-xl min-w-[320px] mx-auto mb-4">
      {/* Desktop Tab Row */}
      <div className="hidden md:flex overflow-x-auto scrollbar-hide px-4 py-2 rounded-2xl border bg-white/95 shadow-md">
        {states.map((state) => (
          <button
            key={state.id}
            onClick={() => onTabChange(state.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-all duration-300 transform hover:scale-105 text-sm mr-2 ${
              activeTab === state.id
                ? `bg-gradient-to-r ${state.color} text-white shadow-lg`
                : "text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <span>{state.icon}</span>
            <span>{state.label}</span>
          </button>
        ))}
      </div>

      {/* Mobile Button */}
      <div className="md:hidden px-4">
        <button
          onClick={() => setShowDrawer(true)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-4 rounded-xl shadow-lg flex items-center justify-between"
        >
          <span>
            {states.find((s) => s.id === activeTab)?.label || "Select State"}
          </span>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Popup for Mobile */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white max-w-md w-full mx-4 rounded-2xl shadow-xl p-4 max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setShowDrawer(false)}
              className="absolute top-3 right-3 text-slate-600 hover:text-red-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold mb-4 text-center">
              Select a Counselling State
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {states.map((state) => (
                <button
                  key={state.id}
                  onClick={() => {
                    onTabChange(state.id);
                    setShowDrawer(false);
                  }}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeTab === state.id
                      ? `bg-gradient-to-r ${state.color} text-white shadow`
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  <span>{state.icon}</span>
                  <span>{state.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StateTabsPG;
