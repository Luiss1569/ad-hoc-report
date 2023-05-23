export const addSort = (sort) => ({
  type: "ADD_SORT",
  payload: { sort },
});

export const removeSort = (id) => ({
  type: "REMOVE_SORT",
  payload: { id },
});

export const changeSort = (id, order) => ({
  type: "CHANGE_SORT",
  payload: { id, order },
});

export const chargeOrderList = (dragging, target) => ({
  type: "CHARGE_ORDER_LIST",
  payload: { dragging, target },
});
