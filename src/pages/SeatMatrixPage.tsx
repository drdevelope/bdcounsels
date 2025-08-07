import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  BarChart3,
  Search,
  Filter,
  X,
  ChevronDown,
  Sort,
  Heart,
} from "lucide-react";
import { seatMatrixAPI } from "../services/api";

interface SeatMatrixPageProps {
  onBack: () => void;
}

interface SeatMatrixData {
  State: string;
  Institute: string;
  Course: string;
  Quota: string;
  Total_Seats: number;
  General: number;
  OBC: number;
  SC: number;
  ST: number;
  EWS: number;
  PWD: number;
}

/**
 * Enhanced Seat Matrix Page Component
 * Features sidebar navigation and comprehensive seat matrix data
 */
const SeatMatrixPage: React.FC<SeatMatrixPageProps> = ({ onBack }) => {
  const [seatMatrixData, setSeatMatrixData] = useState<SeatMatrixData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
  const [examType, setExamType] = useState<"UG" | "PG">("PG");
  const [currentPage, setCurrentPage] = useState(1);

  const counsellingOptions = [
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
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = examType === "UG" 
          ? await seatMatrixAPI.getUGSeatMatrix({ counselling: selectedCounselling })
          : await seatMatrixAPI.getPGSeatMatrix({ counselling: selectedCounselling });
        
        setSeatMatrixData(response.data);
      } catch (error) {
        console.error("Error fetching seat matrix data:", error);
        // Set fallback data
        setSeatMatrixData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCounselling, examType]);

  const itemsPerPage = 50;
  const totalPages = Math.ceil(seatMatrixData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = seatMatrixData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Seat Matrix Data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      {showSidebar && (
        <div className="w-80 bg-white shadow-lg border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Seat Matrix</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* UG/PG Toggle */}
            <div className="flex mb-4 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setExamType("UG")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  examType === "UG" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                NEET UG
              </button>
              <button
                onClick={() => setExamType("PG")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  examType === "PG" 
                    ? "bg-white text-blue-600 shadow-sm" 
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                NEET PG
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search Counselling"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {counsellingOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedCounselling(option)}
                className={`w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-center justify-between ${
                  selectedCounselling === option ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-xs">📊</span>
                  </div>
                  <span className="text-sm text-gray-700">{option}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-800">Seat Matrix</h1>
                <p className="text-sm text-gray-500">What's this?</p>
              </div>
            </div>
            
            {!showSidebar && (
              <button
                onClick={() => setShowSidebar(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>

          <div className="mt-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
              <span className="text-sm font-medium text-orange-700">{selectedCounselling}</span>
              <ChevronDown className="w-4 h-4 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Coming Soon Content */}
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <BarChart3 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Seat Matrix Data</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              We're preparing detailed seat matrix information for all medical colleges including 
              state-wise distribution, quota-wise allocation, and category-wise reservations.
            </p>
            <div className="space-y-3 mb-6">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse w-2/3"></div>
              </div>
              <p className="text-sm text-gray-500">Coming Soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMatrixPage;