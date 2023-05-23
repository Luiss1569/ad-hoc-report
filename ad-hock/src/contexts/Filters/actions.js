export const changeFilter = (id, filter) => ({
  type: "CHANGE_FILTER",
  payload: { id, filter },
});

export const removeFilter = (id) => ({
  type: "REMOVE_FILTER",
  payload: { id },
});

export const addFilter = (id) => ({
  type: "ADD_FILTER",
  payload: { id },
});

export const turnGroup = (id) => ({
  type: "TURN_GROUP",
  payload: { id },
});

export const resetFilter = () => ({
  type: "RESET_FILTER",
});

export const newFilter = () => ({
  type: "NEW_FILTER",
  payload: {
    idx,
    father,
  },
});
