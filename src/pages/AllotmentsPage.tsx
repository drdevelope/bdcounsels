import React, { useState, useEffect } from "react";
import { ArrowLeft, Users, Search, X, ChevronDown, Heart, ChevronLeft as PrevIcon, ChevronRight as NextIcon } from "lucide-react";

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
 * Features sidebar navigation and comprehensive allotment data
 * Focused on NEET PG Medical counselling
 */
const AllotmentsPage: React.FC<AllotmentsPageProps> = ({ onBack }) => {
  const [allotmentData, setAllotmentData] = useState<AllotmentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCounselling, setSelectedCounselling] = useState("All India Counselling - PG Medical");
  const [currentPage, setCurrentPage] = useState(1);

  // NEET PG Counselling categories
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

  // Generate dummy data for demonstration
  const generateDummyData = (counselling: string): AllotmentData[] => {
    const dummyData: AllotmentData[] = [];
    const institutes = [
      "AIIMS New Delhi", "PGIMER Chandigarh", "JIPMER Puducherry", "CMC Vellore",
      "NIMHANS Bangalore", "SGPGIMS Lucknow", "KGMU Lucknow", "BHU Varanasi"
    ];
    const courses = [
      "MD General Medicine", "MD Pediatrics", "MD Psychiatry", "MS General Surgery",
      "MD Anesthesiology", "MD Radiology", "MD Pathology", "MS Orthopedics"
    ];
    const categories = ["GEN", "OBC", "SC", "ST", "EWS"];
    const quotas = ["All India", "State Quota", "Management"];

    for (let i = 0; i < 100; i++) {
      dummyData.push({
        Round: Math.floor(Math.random() * 3) + 1,
        State_Rank: Math.floor(Math.random() * 50000) + 1000,
        State: counselling.includes("Delhi") ? "Delhi" : counselling.includes("Maharashtra") ? "Maharashtra" : "Various",
        Institute: institutes[Math.floor(Math.random() * institutes.length)],
        Course: courses[Math.floor(Math.random() * courses.length)],
        Quota: quotas[Math.floor(Math.random() * quotas.length)],
        Category: categories[Math.floor(Math.random() * categories.length)],
        Fee: `₹${Math.floor(Math.random() * 500000) + 50000}`,
        Stipend_Year_1: `₹${Math.floor(Math.random() * 100000) + 50000}`,
        Bond_Years: Math.floor(Math.random() * 5),
        Bond_Penalty: `₹${Math.floor(Math.random() * 1000000) + 500000}`,
        Beds: Math.floor(Math.random() * 1000) + 100,
      });
    }
    return dummyData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call with dummy data
        const dummyData = generateDummyData(selectedCounselling);
        setAllotmentData(dummyData);
      } catch (error) {
        console.error("Error fetching allotment data:", error);
        setAllotmentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCounselling]);

  const itemsPerPage = 50;
  const totalPages = Math.ceil(allotmentData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = allotmentData.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="flex-1 bg-gradient-to-br from-rose-50 via-blue-50 to-indigo-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading NEET PG Allotment Data...</p>
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
              <h2 className="text-lg font-semibold text-gray-800">NEET PG Allotments</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5 text-gray-500" />
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
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {startIndex + 1} - {Math.min(startIndex + itemsPerPage, allotmentData.length)} of {allotmentData.length} Records in 2024 session
              </span>
            </div>
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
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
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
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, allotmentData.length)} of {allotmentData.length} results
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PrevIcon className="w-4 h-4" />
              </button>
              
              <div className="flex space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                        currentPage === pageNum
                          ? "bg-blue-500 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <NextIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllotmentsPage;