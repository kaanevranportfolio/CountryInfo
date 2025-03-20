const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(cors());

app.get('/countries', async (req, res) => {
  try {
    const response = await axios.get('https://restcountries.com/v3.1/all');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch country data' });
  }
});

app.get('/countries/name/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching country with name ${name}:`, error);
    res.status(404).json({ error: 'Country not found' });
  }
});

app.get('/countries/region/:region', async (req, res) => {
  try {
    const region = req.params.region; // Ensure this line is present and correct
    const response = await axios.get(`https://restcountries.com/v3.1/region/${region}`);
    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching countries in region ${req.params.region}:`, error); // Use req.params.region here
    res.status(404).json({ error: 'Region not found or no countries in the region' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});