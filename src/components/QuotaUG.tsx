import React from "react";

/**
 * NEET UG Quota Component
 * Displays UG-specific quota information
 */
const QuotaUG: React.FC = () => {
  const ugQuotas = [
    "All India Quota",
    "State Quota", 
    "Deemed University",
    "Central University",
    "AIIMS",
    "JIPMER",
    "AFMC",
    "ESI",
    "IP University",
    "BHU",
    "AMU",
    "Jamia Millia Islamia",
    "Management Quota",
    "NRI Quota",
    "Minority Quota",
    "CW of Armed Forces Personnel",
    "Wards of Kashmiri Migrants",
    "Foreign Nationals",
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">NEET UG Quotas</h3>
        <p className="text-sm text-gray-600">Available quota categories for undergraduate medical admissions</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ugQuotas.map((quota, index) => (
          <div
            key={index}
            className="bg-blue-50 px-4 py-3 rounded-lg shadow-sm hover:bg-blue-100 transition-colors text-sm text-blue-800 border border-blue-200"
          >
            {quota}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotaUG;