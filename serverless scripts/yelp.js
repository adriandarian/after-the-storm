const axios = require("axios");
const cors = require("cors")({ origin: true });

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.yelpBusinessData = (req, res) => {
  cors(req, res, () => {
    if (req.method !== "GET") {
      return res.status(401).json({
        message: "Not allowed"
      });
    }

    return axios
      .get("https://api.yelp.com/v3/businesses/search", {
        params: {
          term: req.query.term,
          latitude: req.query.latitude,
          longitude: req.query.longitude
        },
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`
        }
      })
      .then(response => {
        return res.status(200).json(response.data);
      })
      .catch(err => {
        return res.status(500).json({
          error: err
        });
      });
  });
};
