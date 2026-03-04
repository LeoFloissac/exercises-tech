// Separation of Concerns for Service Files Exercise
//
// This service file mixes general utility functions with business logic:
// 1. Contains both general API service functions and specific business operations
// 2. Mixes authentication logic with data fetching
// 3. Includes UI-related logic (alerts, redirects) within the service layer
// 4. Has inconsistent error handling patterns
//
// Your task: Refactor this to:
// 1. Separate general-purpose API functions from business logic
// 2. Remove UI-related code from the service layer
// 3. Create a clean, reusable service structure
// 4. Implement consistent error handling

// src/services/userService.js
import { setToken, removeToken } from '../utils/auth';
import api from './api-service';


// User login - business logic mixed with authentication
export const login = async (email, password) => {
  try {
    const {ok, data, error} = await api.post('/auth/login', { email, password });
    if (!ok) return { success: false, error: error };
    // Store token in localStorage
    setToken(data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    return { success: true, user: data.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// User register
export const register = async (userData) => {
  try {
    const {ok, data, error} = await api.post('/auth/register', userData);
    if (!ok) return { success: false, error: response.error };
    // Automatically log the user in
    return await login(data.email, data.password);
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const {ok, data, error} = await api.get('/user/profile');
    if (!ok) return { success: false, error: error };
    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const result = await api.put('/user/profile', profileData);
    const {ok, data, error} = await api.put('/user/profile', profileData);
    if (!ok) return { success: false, error: error };
    // Update stored user data
    const currentUser = JSON.parse(localStorage.getItem('user'));
    localStorage.setItem('user', JSON.stringify({
      ...currentUser,
      ...profileData
    }));
    
    return { success: true, user: result.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Logout user
export const logout = () => {
  removeToken();
  localStorage.removeItem('user');
};

export default {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  logout
};