// KISS Principle Exercise
//
// This component violates the KISS principle in several ways:
// - It uses unnecessary abstractions (useCallback, useMemo)
// - It has complex state management that's hard to follow
// - It mixes concerns between data fetching, processing, and UI rendering
//
// Your task: Simplify this component by:
// 1. Removing unnecessary abstractions 
// 2. Streamlining the data fetching
// 3. Making the code more straightforward
// 4. Keeping the existing functionality and Tailwind styling

import React, { useState, useEffect } from 'react';
import api from '../services/api-service';

const UserStatistics = ({ userId, preferences }) => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userMetrics, setUserMetrics] = useState({ averageSpend: 0, topCategory: 'None', userTier: 'Silver' });


  const fetchUserData = async () => {
    try {
      const {ok, data} = await api.get('/orders');
      if (!ok) return toast.error("Failed to fetch user data");
      setUser(userData.data);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  const fetchTransactionsData = async () => {
    try {
      const {ok, data} = await api.get(`/transactions?userId=${userId}`);
      if (!ok) return toast.error("Failed to fetch transactions data");
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions data', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([fetchUserData(), fetchTransactionsData()]);
      setIsLoading(false);
    };
    fetchData();
  }, [userId]);


  useEffect(() => {
    const calculateUserMetrics = async () => {
      try {
        if (!transactions.length) return setUserMetrics({ averageSpend: 0, topCategory: 'None', userTier: 'Silver' });

        const averageSpend = transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length;
        const frequencyMap = transactions.reduce((map, t) => {
          map[t.category] = (map[t.category] || 0) + 1;
          return map;
        }, {});
        const topCategory = Object.entries(frequencyMap)
          .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
        
        setUserMetrics({
          averageSpend: averageSpend.toFixed(2),
          topCategory,
          userTier: user?.totalSpent > 10000 ? 'Platinum' : user?.totalSpent > 5000 ? 'Gold' : 'Silver'
        });
      } catch (error) {
        console.error('Failed to calculate user metrics', error);
      }
    };
    calculateUserMetrics();
  }, [transactions, user]);
  
  
  return (
    <div className={`bg-${preferences?.darkMode ? 'gray-800' : 'white'} shadow-lg rounded-lg p-6 m-4 transition-all duration-300 ${preferences?.animations ? 'animate-fade-in' : ''}`}>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <h3 className={`text-${preferences?.darkMode ? 'white' : 'gray-800'} font-bold text-xl mb-4`}>User Statistics</h3>
          <div className={`text-${preferences?.darkMode ? 'gray-300' : 'gray-600'}`}>
            <p className="mb-2">Average Spend: {preferences?.currencySymbol || '$'}{userMetrics.averageSpend}</p>
            <p className="mb-2">Top Category: {userMetrics.topCategory}</p>
            <p className="mb-2">User Tier: 
              <span className={`ml-2 px-2 py-1 rounded text-xs ${
                userMetrics.userTier === 'Platinum' ? 'bg-purple-200 text-purple-800' : 
                userMetrics.userTier === 'Gold' ? 'bg-yellow-200 text-yellow-800' : 
                'bg-gray-200 text-gray-800'
              }`}>
                {userMetrics.userTier}
              </span>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default UserStatistics;
