import React from 'react';

const Filters = ({filter, setFilter, sortBy, setSortBy}) => {
    return (
        <div className="mb-6 flex flex-wrap gap-4">
            <select 
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
            >
                <option value="all">All Orders</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
            </select>
            
            <select 
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
            >
                <option value="date">Sort by Date</option>
                <option value="total">Sort by Total</option>
            </select>
      </div>
    );
};

export default Filters;