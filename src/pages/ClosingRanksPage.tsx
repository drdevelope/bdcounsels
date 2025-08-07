import React, { useState, useEffect } from "react";
import { ArrowLeft, TrendingUp, Search, Filter, X, ChevronDown, SortAsc as Sort, Heart } from "lucide-react";
import { closingRanksAPI } from "../services/api";

interface ClosingRanksPageProps {
  onBack: () => void;
}

interface ClosingRankData {
  Quota: string;
  Category: string;
  State: string;
  Institute: string;
  Course: string;
  Fee: string;
  Stipend_Year_1: string;
  Bond_Years: number;
  Bond_Penalty: string;
  Beds: number;
  CR_2023_1: number;
  CR_2023_2: number;
  CR_2023_3: number;
  CR_2023_4: number;
  CR_2023_5: number;
  CR_2024_1: number;
  CR_2024_2: number;
  CR_2024_3: number;
  CR_2024_4: number;
  CR_2024_5: number;
}

/**
 * Enhanced Closing Ranks Page Component
 * Features sidebar navigation and comprehensive closing ranks data
 */
const ClosingRanksPage: React.FC<ClosingRanksPageProps> = ({ onBack }) => {
  const [closingRankData, setClosingRankData] = useState<ClosingRankData[]>([]);
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
          ? await closingRanksAPI.getUGClosingRanks({ counselling: selectedCounselling })
          : await closingRanksAPI.getPGClosingRanks({ counselling: selectedCounselling });
        
        setClosingRankData(response.data);
      } catch (error) {
        console.error("Error fetching closing ranks data:", error);
        // Set fallback data
        setClosingRankData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCounselling, examType]);

  const itemsPerPage = 50;
  const totalPages = Math.ceil(closingRankData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = closingRankData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Closing Ranks Data...</p>
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
              <h2 className="text-lg font-semibold text-gray-800">Closing Ranks</h2>
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
                <h1 className="text-xl font-semibold text-gray-800">Closing Ranks</h1>
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

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QUOTA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">INSTITUTE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COURSE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FEE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STIPEND YEAR 1</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BOND YEARS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BOND PENALTY</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BEDS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2023 1</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2023 2</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2023 3</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2023 4</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2023 5</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2024 1</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2024 2</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2024 3</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2024 4</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CR 2024 5</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Quota}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Category}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.State}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    {item.Institute}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Course}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Fee}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Stipend_Year_1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Bond_Years}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Bond_Penalty}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Beds}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2023_1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2023_2}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2023_3}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2023_4}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2023_5}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2024_1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2024_2}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2024_3}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2024_4}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.CR_2024_5}</td>
                  <td className="px-4 py-3">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClosingRanksPage;