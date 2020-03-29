const axios = require("axios");
const cors = require("cors")({ origin: true });

function computeFunction(latitude, longitude, term) {
  cors(req, res, () => {
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "Not allowed"
      });
    }

    return axios
      .get(
        "https://us-central1-tinder-tourism.cloudfunctions.net/yelp-business-data",
        {
          params: {
            term: term,
            latitude: latitude,
            longitude: longitude
          }
        }
      )
      .then(yelpResponse => {
        return yelpResponse;
      });
  });
}

// returns array of businesse (each business is a JSON) based on api query
// check for distances greater than 32186
function extractRelevantData(yelpBusinessData, numberToAdd) {}

function sortListByWeights(businessList) {}

function runAPI(latitude, longitude, numberToAdd, term) {
  let searchResult = computeFunction(latitude, longitude, term);
  let cleanedSearchResult = extractRelevantData(searchResult, numberToAdd);
  return cleanedSearchResult;
}

function assignWeight(termName, termWeight, businessList) {
  let businessID = business;
  let distance = 0;
  let distanceWeight = 0;

  businessList.forEach(business => {
    distance = businessList.distance;
    distanceWeight = (distance - 32186) / -3218.6;
    businessList["weight"] = distance * 0.8 + termWeight * 0.2;
  });
}

function algorithm(preferences, latitude, longitude) {
  let businessList = {};

  let termNames = Object.keys(preferences);

  // Query roughly 500 business search based on individual preferences and assign weights
  let remainingBusinesses = 500;
  let tempWeight = preferences[termNames[0]];

  let BreakException = {};

  try {
    termNames.forEach(termName => {
      if (remainingBusinesses > 0) {
        throw BreakException;
      }

      tempWeight = preferences[termName];
      remainingBusinesses -= Math.floor(preferences[termName]) * 4;
      businessList[termName] = assignWeights(
        termName,
        tempWeight,
        runAPI(latitude, longitude, floor(tempWeight) * 4, termName)
      );
    });
  } catch (e) {
    if (e !== BreakException) throw e;
  }

  sortListByWeights(businessList);
  return businessList;
}

console.log(
  algorithm(
    {
      active: 0,
      restaurants: 2,
      food: 5,
      arts: 6
    },
    34.079994,
    -118.25519
  )
);
