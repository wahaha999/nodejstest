const Role = require("./role");

const { dbClient, TableNames } = require("../common/db");
const Handler = require("../handlers/index");

class Action {
  pk;
  parentActionId;
  role;
  data;
  handler;

  constructor(input) {
    this.pk = input.pk;
    this.parentActionId = input.parentActionId;
    this.role = Role.from(input.role);
    this.data = input.data;
    this.handler = Handler.from(input.handler);
  }

  static async getById(id) {
    const res = await dbClient.get({ TableName: TableNames.Action, Key: { pk: id } }).promise();

    if (!res.Item) {
      throw new Error("Action does not exist");
    }

    return new Action(res.Item);
  }

  async getParentAction() {
    const res = await dbClient.get({ TableName: TableNames.Action, Key: { pk: this.parentActionId } }).promise();

    if (!res.Item) {
      throw new Error("Rule does not exist");
    }

    return new Action(res.Item);
  }

  async getChildActions() {
    const res = await dbClient
                      .scan({
                        TableName: TableNames.Action,
                        FilterExpression: "parentActionId = :parentActionId",
                        ExpressionAttributeValues: {
                          ":parentActionId": this.pk,
                        },
                      })
                      .promise();

    if (!res.Items) {
      throw new Error("Action does not exist");
    }

    return res.Items.map((item) => new Action(item));
  }
}

module.exports = Action;