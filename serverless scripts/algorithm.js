const express = require('express')
const axios = require('axios');
const app = express()
const port = 3000

function computeFunction(latitude, longitude, term){
    return axios.get('https://us-central1-tinder-tourism.cloudfunctions.net/yelp-business-data', {
        params: {
            term: term,
            latitude: latitude,
            longitude: longitude
        }
    }).then(yelpResponse => {
        return yelpResponse;
    });
}

// returns array of businesse (each business is a JSON) based on api query
// check for distances greater than 32186
function extractRelevantData(yelpBusinessData, numberToAdd){
    
}

function sortListByWeights(businessList){
    
}

function runAPI(latitude, longitude, numberToAdd, term){
    let searchResult = computeFunction(latitude, longitude, term);
    let cleanedSearchResult = extractRelevantData(searchResult, numberToAdd);
    return cleanedSearchResult;
}

function assignWeight(termName, termWeight, businessList){
    let businessID = business;
    let distance = 0;
    let distanceWeight = 0;
    businessList.forEach(business =>{
        distance = businessList.distance;
        distanceWeight = (distance - 32186) / -3218.6;
        businessList["weight"] = distance * .8 + termWeight * .2;
    });
}

app.get('/', (req, res) => {
    let businessList = {};

    // Pre-sorted list with user preferences with highest preferences listed at the top
    let preferences = req.body.preferences;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    let termNames = Object.keys(preferences);

    // Query roughly 500 business search based on individual preferences and assign weights
    let remainingBusinesses = 500;
    let tempWeight = preferences[termNames[0]];

    termNames.forEach(termName => {
            if (remainingBusinesses > 0){
                break;
            }
            tempWeight = preferences[termName];
            remainingBusinesses -= Math.floor(preferences[termName]) * 4;
            businessList[termName] = assignWeights(termName, tempWeight, runAPI(latitude, longitude, floor(tempWeight) * 4, termName));
    }

    sortListByWeights(businessList);
    res.status(200).json(businessList);
} 


app.listen(port, () => console.log(`Example app listening on port ${port}!`))