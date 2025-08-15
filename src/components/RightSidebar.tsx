import React, { useState } from "react";
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
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  FileText,
  Award,
  Users,
} from "lucide-react";

/**
 * Right Sidebar Component
 * Contains Choice Lists and NEET PG 2025 Updates sections
 * Opens on hover/click with smooth animations
 */
interface RightSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  choiceLists?: any[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({ 
  isOpen, 
  onToggle, 
  choiceLists: propChoiceLists 
}) => {
  const [lists, setLists] = useState(propChoiceLists || [
    {
      id: "1",
      name: "All India PG Priority List",
      count: 28,
      color: "bg-red-50 border-red-200",
      priority: "high",
    },
    {
      id: "2",
      name: "Maharashtra PG List",
      count: 14,
      color: "bg-blue-50 border-blue-200",
      priority: "medium",
    },
    {
      id: "3",
      name: "General Medicine DNB List",
      count: 22,
      color: "bg-green-50 border-green-200",
      priority: "high",
    },
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState("");

  // NEET PG 2025 Updates data based on the provided image
  const neetPGUpdates = [
    {
      id: 1,
      title: "Registration",
      description: "17 Apr 3:00 PM to 7 May, 2025 11:55 PM",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 2,
      title: "Resubmit exam centre choice",
      description: "13 to 17 Jun, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 3,
      title: "Application edit window",
      description: "20 to 22 Jun, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 4,
      title: "Informing exam city to candidates",
      description: "21 Jul, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 5,
      title: "Issue of admit cards",
      description: "31 Jul, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 6,
      title: "NEET PG 2025 Exam",
      description: "03 Aug, 2025",
      status: "completed",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      id: 7,
      title: "NEET PG 2025 Results",
      description: "By 03 Sep, 2025",
      status: "pending",
      icon: Clock,
      color: "text-gray-500",
      bgColor: "bg-gray-100",
    },
    {
      id: 8,
      title: "Counselling",
      description: "To be announced",
      status: "pending",
      icon: Clock,
      color: "text-gray-500",
      bgColor: "bg-gray-100",
    },
  ];

  const createNewList = () => {
    if (newListName.trim()) {
      const newList = {
        id: Date.now().toString(),
        name: newListName.trim(),
        count: 0,
        color: "bg-indigo-50 border-indigo-200",
        priority: "medium",
      };
      setLists([...lists, newList]);
      setNewListName("");
      setShowCreateForm(false);
    }
  };

  const deleteList = (id: string) => {
    setLists(lists.filter((list) => list.id !== id));
  };

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
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={onToggle}
        />
      )}

      {/* Right Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen bg-white/95 backdrop-blur-xl border-l border-slate-200/50 z-50 transition-all duration-300 ease-in-out overflow-y-auto ${
          isOpen ? "w-80 xl:w-96" : "w-0 xl:w-12"
        }`}
        onMouseEnter={() => !isOpen && onToggle()}
        onMouseLeave={() => isOpen && onToggle()}
      >
        {/* Collapsed State - Show only toggle button */}
        {!isOpen && (
          <div className="hidden xl:flex flex-col items-center pt-20 space-y-4">
            <button
              onClick={onToggle}
              className="p-3 bg-gradient-to-r from-pink-400 to-red-400 rounded-l-xl text-white hover:from-pink-500 hover:to-red-500 transition-all duration-200"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={onToggle}
              className="p-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-l-xl text-white hover:from-blue-500 hover:to-purple-500 transition-all duration-200"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Expanded State - Full Content */}
        {isOpen && (
          <div className="p-6 pt-20">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Quick Access</h2>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors xl:hidden"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* NEET PG 2025 Counselling Schedule Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">NEET PG 2025</h3>
                  <p className="text-xs text-slate-500">Counselling Schedule</p>
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto">
                {neetPGUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-200/50 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 ${update.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                        <update.icon className={`w-5 h-5 ${update.color}`} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-slate-800 text-sm mb-1">
                          {update.title}
                        </h4>
                        <p className="text-xs text-slate-600 mb-2">
                          {update.description}
                        </p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            update.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {update.status === "completed" ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Choice Lists Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">My Choice Lists</h3>
                  <p className="text-xs text-slate-500">{lists.length} lists</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-200/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-700">
                    {lists.reduce((sum, list) => sum + list.count, 0)}
                  </div>
                  <div className="text-sm text-blue-600">Total Choices</div>
                </div>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {lists.map((list) => (
                  <div
                    key={list.id}
                    className={`p-3 rounded-xl border-2 ${list.color} hover:shadow-lg transition-all duration-300 group`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getPriorityIcon(list.priority)}
                        <div>
                          <h4 className="font-semibold text-slate-800 text-sm">
                            {list.name}
                          </h4>
                          <p className="text-xs text-slate-600">
                            {list.count} choices
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        <button className="p-1 hover:bg-white/50 rounded-lg transition-colors">
                          <Edit3 className="w-3 h-3 text-slate-600" />
                        </button>
                        <button
                          onClick={() => deleteList(list.id)}
                          className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-3 h-3 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {showCreateForm ? (
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="text"
                    placeholder="Enter list name..."
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === "Enter" && createNewList()}
                  />
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={createNewList}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium text-sm"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => {
                        setShowCreateForm(false);
                        setNewListName("");
                      }}
                      className="flex-1 px-3 py-2 bg-slate-300 text-slate-700 rounded-lg hover:bg-slate-400 transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="w-full mt-4 flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium text-sm">Create New List</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RightSidebar;