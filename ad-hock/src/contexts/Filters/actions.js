export const changeFilter = (id, groupId, filter) => ({
  type: "CHANGE_FILTER",
  payload: { id, groupId, filter },
});

export const changeGroupLogic = (groupId, logic) => ({
  type: "CHANGE_GROUP_LOGIC",
  payload: { groupId, logic },
});

export const removeFilter = (id, groupId) => ({
  type: "REMOVE_FILTER",
  payload: { id, groupId },
});

export const addFilter = (id, groupId) => ({
  type: "ADD_FILTER",
  payload: { id, groupId },
});

export const turnGroup = (id, groupId) => ({
  type: "TURN_GROUP",
  payload: { id, groupId },
});

export const resetFilter = () => ({
  type: "RESET_FILTER",
});

export const newFilter = (groupId) => ({
  type: "NEW_FILTER",
  payload: {
    groupId,
  },
});
