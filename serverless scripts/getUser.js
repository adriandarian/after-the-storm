const MongoClient = require("mongodb").MongoClient;

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.getUser = (req, res) => {
  MongoClient.connect(
    process.env.MONGO_URL_TEST,
    { useUnifiedTopology: true },
    (err, client) => {
      client
        .db("test")
        .collection("user")
        .find({ name: req.query.name })
        .toArray((err, result) => {
          if (err !== null) {
            res.status(400).send(err);
          }

          res.status(200).json(result);
        });
    }
  );
};
