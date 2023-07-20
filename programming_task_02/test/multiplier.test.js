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

beforeAll(async () => {
  await dbClient
  .put({
    TableName: "actions",
    Item: {
      pk: "6",
      role: "sysadmin",
      handler: "MULTIPLIER"
    },
  })
  .promise();
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
        role: "sysadmin",
        parentActionId: "6",
        handler: "COUNTER",
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: "actions",
      Item: {
        pk: "4",
        role: "sysadmin",
        parentActionId: "6",
        handler: "COUNTER",
      },
    })
    .promise();
  await dbClient
    .put({
        TableName: "actions",
        Item: {
            pk: "8",
            role: "sysadmin",
            parentActionId: "1",
            data: {},
        },
    })
    .promise();
  await dbClient
    .put({
        TableName: "actions",
        Item: {
            pk: "2",
            role: "sysadmin",
            parentActionId: "1",
            data: {},
        },
    })
    .promise();
  await dbClient
    .put({
        TableName: "actions",
        Item: {
            pk: "3",
            role: "sysadmin",
            parentActionId: "1",
            data: {},
        },
    })
    .promise();
  await dbClient
    .put({
        TableName: "actions",
        Item: {
            pk: "5",
            role: "sysadmin",
            parentActionId: "4",
            data: {},
        },
    })
    .promise();
  await dbClient
    .put({
        TableName: "actions",
        Item: {
            pk: "7",
            role: "sysadmin",
            parentActionId: "4",
            data: {},
        },
    })
    .promise();
});

test("Multiplier", async () => {
  const { body } = await handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "6" }),
  });

  expect(body).toStrictEqual({ result: 6 });
});
