/**
 * CSV Parser Utilities for Django Server Integration
 * Handles parsing of various CSV data files
 */

export interface AllotmentRecord {
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

export interface CollegeRecord {
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

export interface CounsellingRecord {
  Round: number;
  AI_Rank: number;
  State: string;
  Institute: string;
  Course: string;
  Quota: string;
  Category: string;
}

/**
 * Parse CSV text into structured data
 * @param csvText - Raw CSV content
 * @param type - Type of data to parse
 * @returns Parsed data array
 */
export const parseCSVData = (csvText: string, type: 'allotment' | 'college' | 'counselling'): any[] => {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",");
  
  return lines.slice(1).map((line, index) => {
    const values = line.split(",");
    
    switch (type) {
      case 'allotment':
        return {
          Round: parseInt(values[0]) || 1,
          State_Rank: parseInt(values[1]) || (12897 + index),
          State: values[2] || "Delhi",
          Institute: values[3] || "Sample Institute",
          Course: values[4] || "DNBGENERAL MEDICINE",
          Quota: values[5] || "DNB Sponsored",
          Category: values[6] || "GEN",
          Fee: values[7] || "₹1,25,000",
          Stipend_Year_1: values[8] || "₹1,21,389*",
          Bond_Years: parseInt(values[9]) || 0,
          Bond_Penalty: values[10] || "₹0",
          Beds: parseInt(values[11]) || (980 - index),
        } as AllotmentRecord;
        
      case 'college':
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
        } as CollegeRecord;
        
      case 'counselling':
        return {
          Round: parseInt(values[0]) || 1,
          AI_Rank: parseInt(values[1]) || 0,
          State: values[2] || "",
          Institute: values[3] || "",
          Course: values[4] || "",
          Quota: values[5] || "",
          Category: values[6] || "",
        } as CounsellingRecord;
        
      default:
        return {};
    }
  });
};

/**
 * Fetch and parse CSV data from public folder
 * @param filename - CSV filename in public/data/
 * @param type - Type of data to parse
 * @returns Promise with parsed data
 */
export const fetchCSVData = async (filename: string, type: 'allotment' | 'college' | 'counselling'): Promise<any[]> => {
  try {
    const response = await fetch(`/data/${filename}`);
    const csvText = await response.text();
    return parseCSVData(csvText, type);
  } catch (error) {
    console.error(`Error fetching ${filename}:`, error);
    return [];
  }
};

/**
 * Format currency for display
 * @param amount - Numeric amount
 * @returns Formatted currency string
 */
export const formatCurrency = (amount: number): string => {
  if (amount === 0) return "Free";
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
  return `₹${amount.toLocaleString()}`;
};

/**
 * Get unique values from array of objects
 * @param data - Array of objects
 * @param key - Key to extract unique values from
 * @returns Array of unique values
 */
export const getUniqueValues = (data: any[], key: string): string[] => {
  return Array.from(new Set(data.map(item => item[key]).filter(Boolean)));
};