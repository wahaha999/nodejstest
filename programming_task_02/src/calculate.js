const Action = require("./models/action");

async function calculate(actionid) {
  try {
    // Find the requested action by actionid
    const requestedAction = await Action.getById(actionid);

    // If the requested action is not found, return an empty object
    if (!requestedAction) {
      return {};
    }

    // Perform calculations for the requested action based on its handler or data
    let result = {};
    if (requestedAction.handler !== undefined) {
      // Handle actions with handlers
      result = requestedAction.handler.handle(...await getChildActions(actionid));
    } else {
      // Handle actions with data
      result = requestedAction.data;
    }

    return result;
  } catch (error) {
    console.error("Calculate error:", error);
    return {};
  }
}

async function getChildActions(parentid) {
  try {
    // Find child actions for the given parent action's id
    const childActions = await (await Action.getById(parentid)).getChildActions();

    // Recursively handle child calculations if there are child actions
    const childResults = await Promise.all(childActions.map(async (action) =>
      await calculate(action.pk)
    ));

    return childResults;
  } catch (error) {
    console.error("Get Child Actions error:", error);
    return [];
  }
}

module.exports = calculate;
