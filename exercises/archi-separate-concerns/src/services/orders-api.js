import React from 'react';

const ordersApi = {
    getOrders: async () => {
        const response = await fetch('/api/orders');
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch orders');
        }
        return data;
    },

    sendReminder: async (orderId) => {
        const response = await fetch(`/api/orders/${orderId}/send-reminder`, {
            method: 'POST'
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Failed to send reminder');
          }
          return data;
    },

    markAsShipped: async (orderId) => {
        const response = await fetch(`/api/orders/${orderId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'shipped' })
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Failed to update order');
          }
          return data;
    },
}