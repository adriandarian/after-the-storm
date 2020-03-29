const MongoClient = require("mongodb").MongoClient;

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.updateUser = (req, res) => {
  MongoClient.connect(process.env.MONGO_URL_TEST, (err, client) => {
    client
      .db("test")
      .collection("user")
      .updateOne({ name: req.body.name }, { $set: req.body }, (err, result) => {
        if (err !== null) {
          res.status(400).send(err);
        }

        res.status(200).send(result);
      });
  });
};
