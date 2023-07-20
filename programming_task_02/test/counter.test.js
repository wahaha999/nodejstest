const { handler } = require("../index");
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

beforeEach(async () => {
  await dbClient
    .put({
      TableName: "users",
      Item: {
        pk: "123",
        role: "sysadmin",
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: "actions",
      Item: {
        pk: "1",
        handler: "COUNTER",
        role: "basicuser",
      },
    })
    .promise();
});

test("No items to count", async () => {
  const { body } = await handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "1" }),
  });

  expect(body).toStrictEqual({ result: 0 });
});

test("Some items to count", async () => {
  await dbClient
    .put({
      TableName: "actions",
      Item: {
        pk: "2",
        parentActionId: "1",
        data: {},
      },
    })
    .promise();

  const { body } = await handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "1" }),
  });

  expect(body).toStrictEqual({ result: 1 });
});
