import React, { useState, useEffect } from "react";
import {
  Heart,
  Plus,
  ChevronRight,
  Trash2,
  Edit3,
  Star,
  TrendingUp,
  Eye,
  X,
  Search,
  ChevronDown,
} from "lucide-react";
import { choiceListsAPI } from "../services/api";

/**
 * ChoiceList Interface
 * Defines the structure of a choice list item
 */
interface ChoiceList {
  id: string;
  name: string;
  count: number;
  color: string;
  priority: "high" | "medium" | "low";
  counselling_type: string;
}

/**
 * Enhanced ChoiceLists Component
 * Manages and displays user's choice lists for college preferences
 * Includes create, edit, and delete functionality with API integration
 */
const ChoiceLists: React.FC = () => {
  const [lists, setLists] = useState<ChoiceList[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [searchCounselling, setSearchCounselling] = useState("");
  const [selectedCounselling, setSelectedCounselling] = useState("");

  // Counselling options for choice list creation
  const counsellingOptions = [
    "Chandigarh - PG Medical",
    "Chhattisgarh - PG Medical", 
    "CPS - PG Medical",
    "Delhi - PG Medical",
    "DNB - Inservice Seats - PG Medical",
    "DNB - PDCET - PG Medical",
    "DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)",
    "All India Counselling - UG Medical",
    "Maharashtra - UG Medical",
    "Karnataka - UG Medical",
    "Tamil Nadu - UG Medical",
  ];

  const filteredCounsellingOptions = counsellingOptions.filter(option =>
    option.toLowerCase().includes(searchCounselling.toLowerCase())
  );

  /**
   * Fetch user's choice lists from API
   */
  useEffect(() => {
    const fetchChoiceLists = async () => {
      try {
        const response = await choiceListsAPI.getUserChoiceLists();
        setLists(response.data);
      } catch (error) {
        console.error("Error fetching choice lists:", error);
        // Set fallback data
        setLists([
          {
            id: "1",
            name: "AIQ R1 Priority List",
            count: 28,
            color: "bg-red-50 border-red-200",
            priority: "high",
            counselling_type: "All India Counselling - UG Medical",
          },
          {
            id: "2",
            name: "Maharashtra Govt List",
            count: 14,
            color: "bg-blue-50 border-blue-200",
            priority: "medium",
            counselling_type: "Maharashtra - UG Medical",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchChoiceLists();
  }, []);

  /**
   * Create a new choice list
   */
  const createNewList = async () => {
    if (selectedCounselling.trim()) {
      try {
        const newListData = {
          name: selectedCounselling.trim(),
          counselling_type: selectedCounselling,
          priority: "medium",
        };
        
        const response = await choiceListsAPI.createChoiceList(newListData);
        
        const newList: ChoiceList = {
          id: response.data.id,
          name: selectedCounselling.trim(),
          count: 0,
          color: "bg-indigo-50 border-indigo-200",
          priority: "medium",
          counselling_type: selectedCounselling,
        };
        
        setLists([...lists, newList]);
        setSelectedCounselling("");
        setSearchCounselling("");
        setShowCreateModal(false);
        setShowCreateForm(false);
      } catch (error) {
        console.error("Error creating choice list:", error);
      }
    }
  };

  /**
   * Delete a choice list
   * @param id - ID of the list to delete
   */
  const deleteList = async (id: string) => {
    try {
      await choiceListsAPI.deleteChoiceList(id);
      setLists(lists.filter((list) => list.id !== id));
    } catch (error) {
      console.error("Error deleting choice list:", error);
    }
  };

  /**
   * Get priority icon based on priority level
   */
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Star className="w-4 h-4 text-yellow-500" />;
      case "medium":
        return <TrendingUp className="w-4 h-4 text-blue-500" />;
      default:
        return <div className="w-4 h-4 rounded-full bg-gray-300"></div>;
    }
  };

  return (
    <>
      {/* Mobile Choice Lists - Integrated into main content */}
      <div className="xl:hidden px-4 py-6 pt-20 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-400 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                My Choice lists
              </h2>
              <p className="text-sm text-slate-500">
                {lists.length} choice lists
              </p>
            </div>
          </div>
          <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium flex items-center space-x-1">
            <Eye className="w-4 h-4" />
            <span>View all</span>
          </button>
        </div>

        <div className="space-y-3">
          {lists.slice(0, 3).map((list) => (
            <div
              key={list.id}
              className={`p-4 rounded-xl border-2 ${list.color} hover:shadow-lg transition-all duration-300 group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getPriorityIcon(list.priority)}
                  <div>
                    <h3 className="font-semibold text-slate-800 text-sm">
                      {list.name}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {list.count} choices
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full mt-4 flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Create new</span>
        </button>
      </div>

      {/* Desktop Choice Lists - Sidebar */}
      <div className="hidden xl:block w-80 bg-white/90 backdrop-blur-xl border-l border-slate-200/50 h-screen overflow-y-auto flex-shrink-0 fixed right-0 top-0 z-20 pt-10">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-red-400 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Choice Lists</h2>
              <p className="text-sm text-slate-500">Manage your preferences</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-200/50">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-700">
                {lists.reduce((sum, list) => sum + list.count, 0)}
              </div>
              <div className="text-sm text-blue-600">Total Choices</div>
            </div>
          </div>

          <div className="space-y-4">
            {lists.map((list) => (
              <div
                key={list.id}
                className={`p-4 rounded-xl border-2 ${list.color} hover:shadow-lg transition-all duration-300 group transform hover:scale-105`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getPriorityIcon(list.priority)}
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {list.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {list.count} choices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <button className="p-2 hover:bg-white/50 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4 text-slate-600" />
                    </button>
                    <button
                      onClick={() => deleteList(list.id)}
                      className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full mt-6 flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">Create New List</span>
          </button>
        </div>

        {/* Latest Updates Section */}
        <div className="p-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-800">Latest Updates</h3>
            <button className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {/* NEET PG 2025 Update */}
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200/50">
              <h4 className="font-semibold text-green-900 mb-2">
                NEET PG 2025 Counselling Schedule
              </h4>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Registration: 17 Apr 3:00 PM to 7 May, 2025 11:55 PM</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Exam: 03 Aug, 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Results: By 03 Sep, 2025</span>
                </div>
              </div>
              <div className="text-xs text-green-600 mt-2">2 hours ago</div>
            </div>

            {/* NEET UG Update */}
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-200/50">
              <h4 className="font-semibold text-blue-900 mb-2">
                NEET UG 2025 Results
              </h4>
              <p className="text-sm text-blue-700 mb-2">
                Results declared! Check your scorecard now
              </p>
              <div className="text-xs text-blue-600">5 hours ago</div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
              <h4 className="font-semibold text-purple-900 mb-2">
                Round 3 Registration
              </h4>
              <p className="text-sm text-purple-700 mb-2">
                Registration opens from Oct 8, 2024
              </p>
              <div className="text-xs text-purple-600">1 day ago</div>
            </div>
          </div>
        </div>
      </div>

      {/* Create Choice List Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Create Choice List</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">Please select a counselling to continue</p>
                
                <div className="relative mb-4">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search Counselling"
                    value={searchCounselling}
                    onChange={(e) => setSearchCounselling(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
                  {filteredCounsellingOptions.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCounselling(option)}
                      className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                        selectedCounselling === option ? "bg-blue-50" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs">🏥</span>
                        </div>
                        <span className="text-sm text-gray-700">{option}</span>
                      </div>
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createNewList}
                  disabled={!selectedCounselling}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create List</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChoiceLists;