const authorize = require("./src/authorize.js");
const calculate = require("./src/calculate.js");

// The event argument passed here:
// {Headers: {userid: string}, body: string} - parsed body contains {actionid: string}
exports.handler = async function (event) {
  // Authorize the user
  const authorized = await authorize(event.Headers.userid, JSON.parse(event.body).actionid);

  if (!authorized) {
    // User is not authorized, return an error or handle accordingly
    return {
      statusCode: 403,
      body: { error: "Unauthorized" }
    };
  }

  // User is authorized, proceed with calculation
  const result = await calculate(JSON.parse(event.body).actionid);

  return {
    statusCode: 200,
    body: result
  };
};



