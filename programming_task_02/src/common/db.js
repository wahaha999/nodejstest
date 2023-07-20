const { DynamoDB } = require("aws-sdk");

const dbClient = new DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "eu-west-1",
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
});

const TableNames = {
  User: "users",
  Action: "actions",
};

module.exports = { dbClient, TableNames };
