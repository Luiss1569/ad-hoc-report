export const addColumn = (column) => ({
  type: "ADD_COLUMN",
  payload: { column },
});

export const removeColumn = (id) => ({
  type: "REMOVE_COLUMN",
  payload: { id },
});

export const changeOrderList = (dragging, target) => ({
  type: "CHARGE_ORDER_LIST",
  payload: { dragging, target },
});
