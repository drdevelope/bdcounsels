import React from "react";

/**
 * NEET PG Quota Component  
 * Displays PG-specific quota information
 */
const QuotaPG: React.FC = () => {
  const pgQuotas = [
    "All India Quota",
    "State Quota",
    "Deemed University", 
    "Central University",
    "AIIMS",
    "JIPMER", 
    "PGIMER",
    "NIMHANS",
    "AFMC",
    "ESI",
    "IP University",
    "BHU",
    "AMU",
    "Jamia Millia Islamia",
    "Management Quota",
    "NRI Quota",
    "Minority Quota",
    "DNB",
    "FNB",
    "Diploma",
    "In-service Quota",
    "Sponsored Seats",
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">NEET PG Quotas</h3>
        <p className="text-sm text-gray-600">Available quota categories for postgraduate medical admissions</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pgQuotas.map((quota, index) => (
          <div
            key={index}
            className="bg-green-50 px-4 py-3 rounded-lg shadow-sm hover:bg-green-100 transition-colors text-sm text-green-800 border border-green-200"
          >
            {quota}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotaPG;