import React, { useState } from 'react';
import axios from 'axios';

function Dashboard({ token }) {
  const [marketplace, setMarketplace] = useState('www.amazon.com');
  const [keyword, setKeyword] = useState('');
  const [scrapedData, setScrapedData] = useState(null);
  const [requestsRemaining, setRequestsRemaining] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/scrape', 
        { marketplace, keyword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setScrapedData(response.data.scrapedData);
      setRequestsRemaining(response.data.requestsRemaining);
    } catch (error) {
      console.error('Scraping error', error);
    }
  };

  return (
    <div>
      <h1>Marketplace Scraper</h1>
      <form onSubmit={handleSubmit}>
        <select value={marketplace} onChange={(e) => setMarketplace(e.target.value)}>
          <option value="www.amazon.com">Amazon US</option>
          <option value="www.amazon.in">Amazon India</option>
        </select>
        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Keyword" required />
        <button type="submit">Scrape</button>
      </form>
      {requestsRemaining !== null && <p>Requests remaining: {requestsRemaining}</p>}
      {scrapedData && <pre>{JSON.stringify(scrapedData, null, 2)}</pre>}
    </div>
  );
}

export default Dashboard;

