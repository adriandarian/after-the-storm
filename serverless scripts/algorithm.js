const axios = require("axios");

async function computeFunction(term, latitude, longitude) {
  return await axios.get(
    "https://us-central1-tinder-tourism.cloudfunctions.net/yelp-business-data",
    {
      params: {
        term: term,
        latitude: latitude,
        longitude: longitude
      }
    }
  );
}

// returns array of businesse (each business is a JSON) based on api query
// check for distances greater than 32186
function extractRelevantData(data, limit) {
  data.data.businesses.forEach((business, index) => {
    if (business["is_closed"] === true) {
      data.data.businesses.splice(index, 1);
    }

    data.data.businesses[index] = Object.keys(business)
      .filter(key =>
        [
          "id",
          "name",
          "image_url",
          "url",
          "review_count",
          "categories",
          "rating",
          "coordinates",
          "price",
          "distance"
        ].includes(key)
      )
      .reduce((obj, key) => {
        obj[key] = business[key];
        return obj;
      }, {});
  });

  return data;
}

function sortListByWeights(data) {
  data.business.forEach((business, index) => {
    business.data.businesses.sort((a, b) =>
      a["weight"] > b["weight"]
        ? 1
        : a["weight"] === b["weight"]
        ? a["distance"] > b["distance"]
          ? 1
          : -1
        : -1
    );
  });
}

async function runAPI(term, latitude, longitude, limit) {
  let searchResult = await computeFunction(term, latitude, longitude);
  let cleanedSearchResult = extractRelevantData(searchResult, limit);

  return cleanedSearchResult;
}

function assignWeights(termName, termWeight, data) {
  data.data.businesses.forEach(business => {
    business["weight"] =
      ((business.distance - 32186) / -3218.6) * 0.8 + termWeight * 0.2;
  });

  return data;
}

exports.algorithm = async (req, res) => {
  let preferences = req.body.preferences;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let businesses = {
      business: []
    },
    BreakException = {},
    termNames = Object.keys(preferences),
    remainingBusinesses = 500; // Query roughly 500 business search based on individual preferences and assign weights

  await termNames.reduce((promiseChain, termName) => {
    return promiseChain.then(async () => {
      if (remainingBusinesses < 0) {
        throw BreakException;
      }

      let tempWeight = preferences[termName];
      remainingBusinesses -= Math.floor(preferences[termName]) * 4;

      let data = await runAPI(
        termName,
        latitude,
        longitude,
        Math.floor(tempWeight) * 4
      );

      let weights = assignWeights(termName, tempWeight, data);

      businesses.business.push(weights);
    });
  }, Promise.resolve([]));

  sortListByWeights(businesses);

  let result = {
      suggestions: []
  };
  businesses.business.forEach((e, index) => {
    result.suggestions.push(businesses.business[index].data)
  })
  
  res.status(200).json(result);
};
