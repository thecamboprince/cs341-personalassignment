/*
 * Defines the route handler for the home route.
 */
const homeRoute = (req, res) => {
  /*
   * Responds with a message indicating the lesson and assignment related to a ticketing system.
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   */
  res.send("Lesson 5 Personal Assignment: Ticketing System!");
};

/*
 * Exports the homeRoute function for use in other modules.
 */
module.exports = { homeRoute };
