// api/leetcode.js
import fetch from 'node-fetch';

export default async (req, res) => {
  // Add CORS headers to handle cross-origin requests
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow requests from all origins
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS"); // Allow specific methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Allow specific headers

  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    res.status(200).end(); // Return a success response for preflight request
    return;
  }
  
  // Handle preflight request
  // if (req.method === 'OPTIONS') {
  //   res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin
  //   res.setHeader('Access-Control-Allow-Methods', 'POST'); // Allow POST
  //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers
  //   return res.status(200).end(); // Respond to OPTIONS request with success
  // }

  if (req.method === 'POST') {
    try {
      const response = await fetch('https://leetcode.com/graphql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      });

      const data = await response.json();
      res.setHeader('Access-Control-Allow-Origin', '*'); // Allow any origin for actual POST response
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data from Leetcode:', error.message);
      return res.status(500).json({ error: `Error fetching data from Leetcode: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

