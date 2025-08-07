import React, { useState } from "react";
import {
  Building2,
  GraduationCap,
  Award,
  Users,
  MapPin,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";

interface ExploreSectionProps {
  onNavigate: (page: string) => void;
}

/**
 * Enhanced Explore Section Component
 * Features Management Quota and State Quota options
 */
const ExploreSection: React.FC<ExploreSectionProps> = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const exploreCategories = [
    {
      id: "medical-courses",
      title: "Medical Courses",
      description: "MBBS, BDS, and other medical programs",
      icon: GraduationCap,
      color: "from-blue-500 to-blue-600",
      count: "50+ Courses",
    },
    {
      id: "top-colleges",
      title: "Top Colleges",
      description: "NIRF ranked medical institutions",
      icon: Award,
      color: "from-green-500 to-green-600", 
      count: "Top 100",
    },
    {
      id: "government-colleges",
      title: "Government Colleges",
      description: "State and central government institutions",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      count: "800+ Colleges",
    },
    {
      id: "private-colleges",
      title: "Private Colleges",
      description: "Private medical institutions",
      icon: Building2,
      color: "from-orange-500 to-orange-600",
      count: "770+ Colleges",
    },
    {
      id: "management-quota",
      title: "Management Quota",
      description: "Direct admission through management quota",
      icon: Users,
      color: "from-red-500 to-red-600",
      count: "Available",
    },
    {
      id: "state-quota",
      title: "State Quota",
      description: "State domicile quota admissions",
      icon: MapPin,
      color: "from-indigo-500 to-indigo-600",
      count: "85% Seats",
    },
  ];

  const quotaDetails = [
    {
      title: "Management Quota Admissions",
      description: "Direct admission process for private medical colleges",
      features: [
        "No counselling required",
        "Direct college contact",
        "Higher fee structure", 
        "Immediate admission",
        "Limited seats available",
      ],
      colleges: "500+ Private Colleges",
    },
    {
      title: "State Quota Benefits",
      description: "Reserved seats for state domicile candidates",
      features: [
        "85% seats reserved",
        "Lower cutoff ranks",
        "State counselling process",
        "Domicile certificate required",
        "Better admission chances",
      ],
      colleges: "All Government Colleges",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-8 text-white mb-8 shadow-xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Explore Medical Education</h1>
          <p className="text-blue-100 text-lg">
            Discover colleges, courses, and admission pathways
          </p>
        </div>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {exploreCategories.map((category) => (
          <div
            key={category.id}
            onClick={() => onNavigate(category.id)}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4`}>
              <category.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{category.title}</h3>
            <p className="text-gray-600 text-sm mb-3">{category.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-600">{category.count}</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Quota Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {quotaDetails.map((quota, index) => (
          <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{quota.title}</h3>
            <p className="text-gray-600 mb-6">{quota.description}</p>
            
            <div className="space-y-3 mb-6">
              {quota.features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <span className="text-sm font-medium text-blue-600">{quota.colleges}</span>
              <button 
                onClick={() => onNavigate(index === 0 ? "management-quota" : "state-quota")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
              >
                Learn More
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-800 mb-2">1570+</div>
          <div className="text-sm text-gray-600">Total Colleges</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-800 mb-2">800+</div>
          <div className="text-sm text-gray-600">Government</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-800 mb-2">770+</div>
          <div className="text-sm text-gray-600">Private</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-gray-800 mb-2">28</div>
          <div className="text-sm text-gray-600">States</div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;