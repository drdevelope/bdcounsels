/**
 * API Integration for Django Server
 * Handles data fetching and API calls
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * Generic API fetch function
 * @param endpoint - API endpoint
 * @param options - Fetch options
 * @returns Promise with API response
 */
export const apiCall = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    return {
      success: false,
      data: {} as T,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

/**
 * Fetch allotment data from Django API
 * @param filters - Filter parameters
 * @returns Promise with allotment data
 */
export const fetchAllotments = async (filters: any = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return apiCall(`/allotments?${queryParams}`);
};

/**
 * Fetch college data from Django API
 * @param filters - Filter parameters
 * @returns Promise with college data
 */
export const fetchColleges = async (filters: any = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return apiCall(`/colleges?${queryParams}`);
};

/**
 * Fetch counselling data from Django API
 * @param filters - Filter parameters
 * @returns Promise with counselling data
 */
export const fetchCounsellingData = async (filters: any = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  return apiCall(`/counselling?${queryParams}`);
};

/**
 * Create choice list via Django API
 * @param listData - Choice list data
 * @returns Promise with creation result
 */
export const createChoiceList = async (listData: any) => {
  return apiCall('/choice-lists', {
    method: 'POST',
    body: JSON.stringify(listData),
  });
};

/**
 * Add college to choice list via Django API
 * @param listId - Choice list ID
 * @param collegeId - College ID to add
 * @returns Promise with update result
 */
export const addToChoiceList = async (listId: string, collegeId: string) => {
  return apiCall(`/choice-lists/${listId}/colleges`, {
    method: 'POST',
    body: JSON.stringify({ collegeId }),
  });
};

/**
 * Fetch user's choice lists from Django API
 * @param userId - User ID
 * @returns Promise with choice lists
 */
export const fetchUserChoiceLists = async (userId: string) => {
  return apiCall(`/users/${userId}/choice-lists`);
};

/**
 * Search colleges with advanced filters
 * @param searchParams - Search and filter parameters
 * @returns Promise with search results
 */
export const searchColleges = async (searchParams: {
  query?: string;
  state?: string;
  type?: string;
  quota?: string;
  minRank?: number;
  maxRank?: number;
  minFees?: number;
  maxFees?: number;
}) => {
  const queryParams = new URLSearchParams(
    Object.entries(searchParams).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value.toString();
      }
      return acc;
    }, {} as Record<string, string>)
  ).toString();
  
  return apiCall(`/colleges/search?${queryParams}`);
};