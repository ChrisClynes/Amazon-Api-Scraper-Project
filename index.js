const express = require('express');
const request = require ('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

const apiKey = process.env.REACT_APP_SCRAPERAPI_API_KEY;
const baseUrl = `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

//you can hide this api key outside this file and require a user of the api to provide their own key using a function to replace baseUrl
//function would be: const returnScraperApiUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;
//then you would add ( const { api_key } = req.query )to each route below, this destruct the api key from the url they type in
//and also change the {baseUrl} to ${api_key} to pass the users key to the request


app.use(express.json());// parses JSON


//first route, request and response
app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API.');
});


//GET product details... :productId means it is going to be dynamic
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/dp/${productId}`);

        res.json(JSON.parse(response));//sends response to server to display
    } catch (error) {
        res.json(error);
    }
})

//GET product Reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`);

        res.json(JSON.parse(response));//sends response to server to display
    } catch (error) {
        res.json(error);
    }
})

//GET product Offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`);

        res.json(JSON.parse(response));//sends response to server to display
    } catch (error) {
        res.json(error);
    }
})

//GET Search Results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;

    try {
        const response = await request(`${baseUrl}&url=https://www.amazon.com/s?k=/${searchQuery}`);

        res.json(JSON.parse(response));//sends response to server to display
    } catch (error) {
        res.json(error);
    }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


