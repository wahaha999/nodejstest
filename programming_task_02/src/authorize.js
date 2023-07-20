const Action = require("./models/action");
const Role = require("./models/role");
const User = require("./models/user");

async function authorize(userid, actionid) {
  try {
    // get the user by the userid
    const user = await User.getById(userid);

    // Get the action by the actionid
    const action = await Action.getById(actionid);

    // Check the role hierarchy for authorization
    const roleHierarchy = {
      [Role.SYS_ADMIN]: 0,
      [Role.LOCAL_ADMIN]: 1,
      [Role.ENTERPRISE_USER]: 2,
      [Role.BASIC_USER]: 3
    }

    const userRolePriority = roleHierarchy[user.role];
    const actionRolePriority = roleHierarchy[action.role];

    if (userRolePriority === undefined || actionRolePriority === undefined) {
      // Invalid role(s)
      return false;
    }

    if (userRolePriority === 0 || actionRolePriority === 3) {
      // SYS_ADMIN can perform any action
      // BASIC_USER can perform any action
      return true;
    }

    return userRolePriority <= actionRolePriority;
  } catch (error) {
    console.error("Authorization error:", error);
    return false;
  }
}

module.exports = authorize;
