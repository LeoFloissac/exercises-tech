import React from 'react';

const Summary = ({ orders, totalRevenue, customerEmails }) => {
    return (
        <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">Dashboard Summary</h2>
            <p className="mb-1">Total Orders: {orders.length}</p>
            <p className="mb-1">Total Revenue: ${totalRevenue.toFixed(2)}</p>
            <p>Unique Customers: {customerEmails.length}</p>
      </div>
    );
};

export default Summary;