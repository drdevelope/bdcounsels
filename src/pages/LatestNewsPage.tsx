import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Bell,
  FileText,
  Award,
  Users,
  Search,
  Filter,
} from "lucide-react";

interface LatestNewsPageProps {
  onBack: () => void;
}

interface NewsItem {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  status: "completed" | "pending" | "active";
  category: "exam" | "result" | "counselling" | "registration" | "schedule";
  priority: "high" | "medium" | "low";
}

/**
 * Latest News Page Component
 * Displays NEET PG 2025 updates, schedules, and announcements
 */
const LatestNewsPage: React.FC<LatestNewsPageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // NEET PG 2025 News and Updates
  const newsItems: NewsItem[] = [
    {
      id: 1,
      title: "Registration",
      description: "17 Apr 3:00 PM to 7 May, 2025 11:55 PM",
      date: "2025-04-17",
      time: "3:00 PM",
      status: "completed",
      category: "registration",
      priority: "high",
    },
    {
      id: 2,
      title: "Resubmit exam centre choice",
      description: "13 to 17 Jun, 2025",
      date: "2025-06-13",
      time: "All Day",
      status: "completed",
      category: "exam",
      priority: "medium",
    },
    {
      id: 3,
      title: "Application edit window",
      description: "20 to 22 Jun, 2025",
      date: "2025-06-20",
      time: "All Day",
      status: "completed",
      category: "registration",
      priority: "medium",
    },
    {
      id: 4,
      title: "Informing exam city to candidates",
      description: "21 Jul, 2025",
      date: "2025-07-21",
      time: "All Day",
      status: "completed",
      category: "exam",
      priority: "high",
    },
    {
      id: 5,
      title: "Issue of admit cards",
      description: "31 Jul, 2025",
      date: "2025-07-31",
      time: "All Day",
      status: "completed",
      category: "exam",
      priority: "high",
    },
    {
      id: 6,
      title: "NEET PG 2025 Exam",
      description: "03 Aug, 2025",
      date: "2025-08-03",
      time: "All Day",
      status: "completed",
      category: "exam",
      priority: "high",
    },
    {
      id: 7,
      title: "NEET PG 2025 Results",
      description: "By 03 Sep, 2025",
      date: "2025-09-03",
      time: "Expected",
      status: "pending",
      category: "result",
      priority: "high",
    },
    {
      id: 8,
      title: "Counselling",
      description: "To be announced",
      date: "2025-09-15",
      time: "TBA",
      status: "pending",
      category: "counselling",
      priority: "high",
    },
  ];

  const categories = [
    { id: "all", label: "All Updates", icon: Bell },
    { id: "exam", label: "Exam", icon: FileText },
    { id: "result", label: "Results", icon: Award },
    { id: "counselling", label: "Counselling", icon: Users },
    { id: "registration", label: "Registration", icon: Calendar },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "active":
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-xl font-bold text-slate-800">Latest News & Updates</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-bold mb-4">NEET PG 2025 Counselling Schedule</h2>
            <p className="text-green-100 text-lg">
              Stay updated with the latest NEET PG counselling timeline and announcements
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search updates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                    selectedCategory === category.id
                      ? "bg-green-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline View */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">NEET PG 2025 Timeline</h3>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {filteredNews.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      item.status === "completed" ? "bg-green-100" : "bg-gray-100"
                    }`}>
                      {getStatusIcon(item.status)}
                    </div>
                    {index < filteredNews.length - 1 && (
                      <div className={`w-0.5 h-8 mx-auto mt-2 ${
                        item.status === "completed" ? "bg-green-300" : "bg-gray-300"
                      }`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800 text-lg">
                        {item.title}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}
                      >
                        {item.status === "completed" ? "Completed" : item.status === "active" ? "Active" : "Pending"}
                      </span>
                    </div>
                    <p className="text-slate-600 mb-2">{item.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{item.time}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* No Results Message */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              No updates found
            </h3>
            <p className="text-slate-600">
              Try adjusting your search terms or category filter
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestNewsPage;