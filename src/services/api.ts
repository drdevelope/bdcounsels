import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Authentication APIs
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login/', credentials),
  
  signup: (userData: any) =>
    api.post('/auth/signup/', userData),
  
  logout: () =>
    api.post('/auth/logout/'),
  
  getProfile: () =>
    api.get('/auth/profile/'),
  
  updateProfile: (profileData: any) =>
    api.put('/auth/profile/', profileData),
};

// Allotments APIs
export const allotmentsAPI = {
  getUGAllotments: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/allotments/ug/?${params}`);
  },
  
  getPGAllotments: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/allotments/pg/?${params}`);
  },
};

// Closing Ranks APIs
export const closingRanksAPI = {
  getUGClosingRanks: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/closing-ranks/ug/?${params}`);
  },
  
  getPGClosingRanks: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/closing-ranks/pg/?${params}`);
  },
};

// Seat Matrix APIs
export const seatMatrixAPI = {
  getUGSeatMatrix: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/seat-matrix/ug/?${params}`);
  },
  
  getPGSeatMatrix: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/seat-matrix/pg/?${params}`);
  },
};

// Fee, Stipend & Bond APIs
export const feeStipendBondAPI = {
  getUGFeeData: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/fee-stipend-bond/ug/?${params}`);
  },
  
  getPGFeeData: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/fee-stipend-bond/pg/?${params}`);
  },
};

// Colleges APIs
export const collegesAPI = {
  getAllColleges: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/colleges/?${params}`);
  },
  
  getCollegeDetails: (id: string) =>
    api.get(`/colleges/${id}/`),
  
  searchColleges: (searchParams: any) => {
    const params = new URLSearchParams(searchParams);
    return api.get(`/colleges/search/?${params}`);
  },
};

// Choice Lists APIs
export const choiceListsAPI = {
  getUserChoiceLists: () =>
    api.get('/choice-lists/'),
  
  createChoiceList: (listData: any) =>
    api.post('/choice-lists/', listData),
  
  updateChoiceList: (id: string, listData: any) =>
    api.put(`/choice-lists/${id}/`, listData),
  
  deleteChoiceList: (id: string) =>
    api.delete(`/choice-lists/${id}/`),
  
  addToChoiceList: (listId: string, collegeId: string) =>
    api.post(`/choice-lists/${listId}/colleges/`, { collegeId }),
  
  removeFromChoiceList: (listId: string, collegeId: string) =>
    api.delete(`/choice-lists/${listId}/colleges/${collegeId}/`),
};

// Counselling APIs
export const counsellingAPI = {
  getCounsellingData: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/counselling/?${params}`);
  },
  
  getINICETData: (filters: any = {}) => {
    const params = new URLSearchParams(filters);
    return api.get(`/counselling/inicet/?${params}`);
  },
  
  getCounsellingTimeline: () =>
    api.get('/counselling/timeline/'),
};

// Predictors APIs
export const predictorsAPI = {
  predictUGColleges: (rankData: any) =>
    api.post('/predictor/ug/', rankData),
  
  predictPGSpecialties: (rankData: any) =>
    api.post('/predictor/pg/', rankData),
  
  predictRank: (scoreData: any) =>
    api.post('/predictor/rank/', scoreData),
};

// FAQ APIs
export const faqAPI = {
  getAllFAQs: () =>
    api.get('/faq/'),
  
  getFAQsByCategory: (category: string) =>
    api.get(`/faq/?category=${category}`),
};

// Support APIs
export const supportAPI = {
  createTicket: (ticketData: any) =>
    api.post('/support/tickets/', ticketData),
  
  getUserTickets: () =>
    api.get('/support/tickets/'),
  
  updateTicket: (id: string, ticketData: any) =>
    api.put(`/support/tickets/${id}/`, ticketData),
};

export default api;