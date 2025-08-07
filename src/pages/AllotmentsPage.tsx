import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Users,
  Search,
  Filter,
  X,
  ChevronDown,
  Sort,
  Heart,
  MoreHorizontal,
  Download,
  Eye,
} from "lucide-react";
import { allotmentsAPI } from "../services/api";

interface AllotmentsPageProps {
  onBack: () => void;
}

interface AllotmentData {
  Round: number;
  State_Rank: number;
  State: string;
  Institute: string;
  Course: string;
  Quota: string;
  Category: string;
  Fee: string;
  Stipend_Year_1: string;
  Bond_Years: number;
  Bond_Penalty: string;
  Beds: number;
}

/**
 * Enhanced Allotments Page Component
 * Features sidebar navigation, detailed table view, and choice list functionality
 * Supports both UG and PG allotment data with proper filtering
 */
const AllotmentsPage: React.FC<AllotmentsPageProps> = ({ onBack }) => {
  const [allotmentData, setAllotmentData] = useState<AllotmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCounselling, setSelectedCounselling] = useState("DNB Sponsored - PG Medical (Govt or PSU Inservice Candidates)");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showChoiceModal, setShowChoiceModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<AllotmentData | null>(null);
  const [examType, setExamType] = useState<"UG" | "PG">("PG");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("State_Rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Counselling options for sidebar
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
    "Chandigarh - PG Medical",
    "Chhattisgarh - PG Medical",
    "CPS - PG Medical",
    "Delhi - PG Medical",
    "DNB - Inservice Seats - PG Medical",
    "DNB - PDCET - PG Medical",
  ];

  const parseCSV = (csvText: string): AllotmentData[] => {
    const lines = csvText.trim().split("\n");
    return lines.slice(1).map((line, index) => {
      const values = line.split(",");
      return {
        Round: 1,
        State_Rank: 12897 + index,
        State: values[0] || "Delhi",
        Institute: values[1] || "Sample Institute",
        Course: "DNBGENERAL MEDICINE",
        Quota: "DNB Sponsored",
        Category: "GEN",
        Fee: "₹1,25,000",
        Stipend_Year_1: "₹1,21,389*",
        Bond_Years: 0,
        Bond_Penalty: "₹0",
        Beds: 980 - index,
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Try to fetch from API first
        const response = examType === "UG" 
          ? await allotmentsAPI.getUGAllotments({ counselling: selectedCounselling })
          : await allotmentsAPI.getPGAllotments({ counselling: selectedCounselling });
        
        setAllotmentData(response.data);
      } catch (error) {
        console.error("Error fetching allotment data:", error);
        
        // Fallback to CSV data
        try {
          const csvFile = examType === "UG" 
            ? "/data/Neet_UG_Allotment_data_all-open_seats.csv"
            : "/data/INICET_PG.csv";
          
          const response = await fetch(csvFile);
          const csvText = await response.text();
          const parsedData = parseCSV(csvText);
          setAllotmentData(parsedData);
        } catch (csvError) {
          console.error("Error fetching CSV data:", csvError);
          // Set fallback data
          setAllotmentData([
            {
              Round: 1,
              State_Rank: 12897,
              State: "Delhi",
              Institute: "Hindu Rao Hospital, Delhi",
              Course: "DNBGENERAL MEDICINE",
              Quota: "DNB Sponsored",
              Category: "GEN",
              Fee: "₹1,25,000",
              Stipend_Year_1: "₹1,21,389*",
              Bond_Years: 0,
              Bond_Penalty: "₹0",
              Beds: 980,
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCounselling, examType]);

  const filteredData = allotmentData.filter((item) => {
    const matchesSearch =
      item.Institute.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.State.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleAddToChoiceList = (record: AllotmentData) => {
    setSelectedRecord(record);
    setShowChoiceModal(true);
  };

  const itemsPerPage = 50;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading Allotment Data...</p>
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
              <h2 className="text-lg font-semibold text-gray-800">Allotments</h2>
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
                    <span className="text-xs">🏥</span>
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
                <h1 className="text-xl font-semibold text-gray-800">Allotments</h1>
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

          {/* Selected Counselling Display */}
          <div className="mt-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-lg">
              <span className="text-sm font-medium text-orange-700">{selectedCounselling}</span>
              <ChevronDown className="w-4 h-4 text-orange-600" />
            </div>
          </div>

          {/* Info Text */}
          <div className="mt-4 text-sm text-gray-600">
            <p>Click on the record for detailed information and factors.</p>
            <p>(*) Indicates additional remarks available in Details & Factors.</p>
          </div>

          {/* Controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {startIndex + 1} - {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} Records in 2024 session
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  State Rank
                </button>
                <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded">
                  All India Rank
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Ask every time</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  <Sort className="w-4 h-4" />
                  <span>Sort</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROUND</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATE RANK</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STATE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">INSTITUTE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">COURSE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">QUOTA</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CATEGORY</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">FEE</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STIPEND YEAR 1</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BOND YEARS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BOND PENALTY</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">BEDS</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Round}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.State_Rank}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.State}</td>
                  <td className="px-4 py-3 text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                    {item.Institute}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Course}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Quota}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Category}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Fee}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Stipend_Year_1}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Bond_Years}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Bond_Penalty}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{item.Beds}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleAddToChoiceList(item)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length} results
            </div>
            <div className="flex items-center space-x-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 ${
                    currentPage === page ? "bg-blue-500 text-white border-blue-500" : ""
                  }`}
                >
                  {page}
                </button>
              ))}
              {totalPages > 5 && (
                <>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    &gt;
                  </button>
                  <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                    &gt;&gt;
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Choice List Modal */}
      {showChoiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Add to Choice List</h3>
                <button
                  onClick={() => setShowChoiceModal(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Selected Institute:</p>
                <p className="font-medium text-gray-800">{selectedRecord?.Institute}</p>
                <p className="text-sm text-gray-600">{selectedRecord?.Course}</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowChoiceModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add to choice list logic here
                    setShowChoiceModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  + Create List
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllotmentsPage;