import React, { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Search,
  X,
  Plus,
  ChevronDown,
  Building2,
  MapPin,
  Award,
  Filter,
} from "lucide-react";

interface ChoiceListsPageProps {
  onBack: () => void;
}

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: "Government" | "Private";
  course: string;
  quota: string;
  rank: number;
}

/**
 * Enhanced Choice Lists Page Component based on the provided design
 * Features create choice list modal, college search, and management
 */
const ChoiceListsPage: React.FC<ChoiceListsPageProps> = ({ onBack }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchCounselling, setSearchCounselling] = useState("");
  const [selectedCounselling, setSelectedCounselling] = useState("");
  const [choiceLists, setChoiceLists] = useState<any[]>([]);

  // NEET PG Counselling options
  const counsellingOptions = [
    "All India Counselling - PG Medical",
    "Armed Forces Medical Services - AFMS (through MCC) - PG Medical",
    "Open States (Private Institute seats available for all candidates)",
    "Andhra Pradesh Government Quota - PG Medical",
    "Andhra Pradesh Management Quota - PG Medical",
    "Assam - PG Medical",
    "Bihar - PG Medical",
    "Chandigarh - PG Medical",
    "Chhattisgarh - PG Medical",
    "Delhi - PG Medical",
    "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)",
    "Goa - PG Medical",
    "Gujarat - PG Medical",
    "Haryana - PG Medical",
    "Himachal Pradesh - PG Medical",
    "Jammu and Kashmir - PG Medical",
    "Jharkhand - PG Medical",
    "Karnataka - PG Medical",
    "Kerala - PG Medical",
    "Madhya Pradesh - PG Medical",
    "Maharashtra - PG Medical",
    "Manipur-JNIMS - PG Medical",
    "Manipur-RIMS - PG Medical",
    "NEIGRIHMS - PG Medical",
    "Odisha - PG Medical",
    "Pondicherry - PG Medical",
    "Punjab - PG Medical",
    "Rajasthan - PG Medical",
    "Sikkim - PG Medical",
    "Tamil Nadu Government Quota - PG Medical",
    "Tamil Nadu Management Quota - PG Medical",
    "Telangana Government Quota - PG Medical",
    "Telangana Management Quota - PG Medical",
    "Tripura - PG Medical",
    "Uttarakhand - PG Medical",
    "Uttar Pradesh - PG Medical",
    "West Bengal - PG Medical",
  ];

  const filteredCounsellingOptions = counsellingOptions.filter(option =>
    option.toLowerCase().includes(searchCounselling.toLowerCase())
  );

  const handleCreateChoiceList = () => {
    if (selectedCounselling) {
      const newList = {
        id: Date.now().toString(),
        name: selectedCounselling,
        colleges: [],
        createdAt: new Date(),
      };
      setChoiceLists([...choiceLists, newList]);
      setShowCreateModal(false);
      setSelectedCounselling("");
      setSearchCounselling("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-white/20 px-4 lg:px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </button>
          <h1 className="text-xl font-bold text-slate-800">My Choice Lists</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Create Counselling specific Choice lists to curate your choices (preferred order of seats) specific to each counselling.
            </h2>
            <p className="text-slate-600 mb-6">
              You can add to a preferred seat to a Choice list from the Allotments, Closing Ranks, Seat Matrix, and Fee, Stipend & Bond menus.
            </p>
            
            {choiceLists.length === 0 ? (
              <div className="mb-8">
                <p className="text-slate-500 mb-6">
                  You don't have any choice lists currently. Create one here or add from any of the sections.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 mb-8">
                {choiceLists.map((list) => (
                  <div key={list.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50">
                    <h3 className="font-semibold text-slate-800">{list.name}</h3>
                    <p className="text-sm text-slate-600">{list.colleges.length} colleges</p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              <span>Create Choice List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Create Choice List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full mx-4 border border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Create Choice List</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-slate-600 mb-4">Please select a counselling to continue</p>
                
                <div className="relative mb-4">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search Counselling"
                    value={searchCounselling}
                    onChange={(e) => setSearchCounselling(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl">
                  {filteredCounsellingOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCounselling(option)}
                      className={`w-full text-left px-4 py-3 border-b border-slate-100 hover:bg-slate-50 transition-colors flex items-center justify-between ${
                        selectedCounselling === option ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-slate-200 rounded-full flex items-center justify-center">
                          <span className="text-xs">🏥</span>
                        </div>
                        <span className="text-sm text-slate-700">{option}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateChoiceList}
                  disabled={!selectedCounselling}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create List</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChoiceListsPage;