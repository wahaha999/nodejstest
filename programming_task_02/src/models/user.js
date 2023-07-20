const { dbClient, TableNames } = require("../common/db");
const Role = require("./role");

class User {
  pk;
  role;

  constructor(input) {
    this.pk = input.pk;
    this.role = Role.from(input.role);
  }

  static async getById(id) {
    const res = await dbClient.get({ TableName: TableNames.User, Key: { pk: id } }).promise();

    if (!res.Item) {
      throw new Error("User does not exist");
    }

    return new User(res.Item);
  }
}

module.exports = User;
