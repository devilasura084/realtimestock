const express = require('express');//here i intialited express
const axios = require('axios');//also initialised axios as i have make get requests to yahoo finance
require('dotenv').config();
const cors = require('cors');
const app = express();//created my router
const port = process.env.PORT || 3000;

const yahooFinance = require('yahoo-finance2').default;
app.use(cors());
const today = new Date();//i am taking todays date
const twoDaysAgo = new Date();//and the first day of the month
twoDaysAgo.setDate(today.getDate()-today.getDate());

const period1 = twoDaysAgo.toISOString().split('T')[0]; // Format: 'YYYY-MM-DD'
const period2 = today.toISOString().split('T')[0];//splitting them to just get the Format: 'YYYY-MM-DD'
app.get('/api/stock/:symbol', async (req, res) => {
    const { symbol } = req.params;//taking the symbol as a request parameter
    
    try {
      const result = await yahooFinance.historical(symbol, {//requesting the data from yahoofinance
        period1: period1,  // Start date
        period2: period2,  // End date
        interval: '1d'     
      });
  
      res.json(result);//sending the response data back
    } catch (error) {
      console.error('Error fetching stock data:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});