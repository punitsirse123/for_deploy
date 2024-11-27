import express from 'express';
import axios from 'axios';
import User from '../models/User.js';

const router = express.Router();

const scrapeMarketplace = async (url) => {
  const apiUrl = `http://api.scrape.do?token=${process.env.SCRAPE_DO_TOKEN}&url=${encodeURIComponent(url)}`;
  const response = await axios.get(apiUrl);
  return response.data;
};

router.post('/', async (req, res) => {
  try {
    const { userId, marketplace, keyword } = req.body;
    const user = await User.findById(userId);
    if (user.requestsRemaining <= 0) {
      return res.status(403).json({ message: 'No requests remaining' });
    }
    const url = `https://${marketplace}/s?k=${encodeURIComponent(keyword)}`;
    const scrapedData = await scrapeMarketplace(url);
    user.requestsRemaining -= 1;
    await user.save();
    res.json({ scrapedData, requestsRemaining: user.requestsRemaining });
  } catch (error) {
    res.status(500).json({ message: 'Error scraping marketplace' });
  }
});

export default router;

