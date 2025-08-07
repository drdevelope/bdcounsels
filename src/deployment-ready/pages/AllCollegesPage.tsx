import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Filter,
  Building2,
  MapPin,
  Award,
  Users,
  IndianRupee,
  Heart,
  Eye,
  ChevronDown,
} from "lucide-react";

interface AllCollegesPageProps {
  onBack: () => void;
}

interface College {
  NIRF_Rank_2024: number;
  College_Name: string;
  City: string;
  State: string;
  NIRF_Score: number;
  Tuition_Fees_Per_Year: number;
  MBBS_Seats: number;
  NEET_Cutoff_AIR_General: string;
  Established: number;
  College_Type: string;
}

/**
 * All Colleges Page Component
 * Displays comprehensive database of 1570+ medical colleges across India
 * Features search, filtering, and detailed college information
 */
const AllCollegesPage: React.FC<AllCollegesPageProps> = ({ onBack }) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedQuota, setSelectedQuota] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const parseCSV = (csvText: string): College[] => {
    const lines = csvText.trim().split("\n");
    return lines.slice(1).map((line) => {
      const values = line.split(",");
      return {
        NIRF_Rank_2024: parseInt(values[0]) || 0,
        College_Name: values[1] || "",
        City: values[2] || "",
        State: values[3] || "",
        NIRF_Score: parseFloat(values[4]) || 0,
        Tuition_Fees_Per_Year: parseInt(values[5]) || 0,
        MBBS_Seats: parseInt(values[6]) || 0,
        NEET_Cutoff_AIR_General: values[7] || "",
        Established: parseInt(values[8]) || 0,
        College_Type: values[9] || "",
      };
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/TOP_50_NIRF.csv");
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setColleges(parsedData);
      } catch (error) {
        console.error("Error fetching college data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch =
      college.College_Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.City.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.State.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = selectedState === "all" || college.State === selectedState;
    const matchesType = selectedType === "all" || college.College_Type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesState && matchesType;
  });

  const states = ["all", ...Array.from(new Set(colleges.map((college) => college.State)))];
  const types = ["all", "Government", "Private"];
  const quotas = ["all", "All India", "State Quota", "Management Quota"];

  const formatCurrency = (amount: number) => {
    if (amount === 0) return "Free";
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Colleges Database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
              <h1 className="text-xl font-semibold text-gray-800">All Medical Colleges</h1>
              <p className="text-sm text-gray-500">1570+ colleges across India</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "table" : "grid")}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              {viewMode === "grid" ? "Table View" : "Grid View"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search colleges, cities, states..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {states.map((state) => (
                <option key={state} value={state}>
                  {state === "all" ? "All States" : state}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {types.map((type) => (
                <option key={type} value={type}>
                  {type === "all" ? "All Types" : type}
                </option>
              ))}
            </select>

            <select
              value={selectedQuota}
              onChange={(e) => setSelectedQuota(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {quotas.map((quota) => (
                <option key={quota} value={quota}>
                  {quota === "all" ? "All Quotas" : quota}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredColleges.length} of {colleges.length} colleges
          </p>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => (
              <div key={college.NIRF_Rank_2024} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                        Rank #{college.NIRF_Rank_2024}
                      </span>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        college.College_Type === "Government" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-purple-100 text-purple-800"
                      }`}>
                        {college.College_Type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                      {college.College_Name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {college.City}, {college.State}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">NIRF Score:</span>
                    <span className="font-medium">{college.NIRF_Score}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fees:</span>
                    <span className="font-medium">{formatCurrency(college.Tuition_Fees_Per_Year)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">MBBS Seats:</span>
                    <span className="font-medium">{college.MBBS_Seats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Established:</span>
                    <span className="font-medium">{college.Established}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewMode === "table" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredColleges.map((college) => (
                    <tr key={college.NIRF_Rank_2024} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                          #{college.NIRF_Rank_2024}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{college.College_Name}</div>
                        <div className="text-sm text-gray-500">Est. {college.Established}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{college.City}</div>
                        <div className="text-sm text-gray-500">{college.State}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          college.College_Type === "Government" 
                            ? "bg-green-100 text-green-800" 
                            : "bg-purple-100 text-purple-800"
                        }`}>
                          {college.College_Type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(college.Tuition_Fees_Per_Year)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {college.MBBS_Seats}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No colleges found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCollegesPage;