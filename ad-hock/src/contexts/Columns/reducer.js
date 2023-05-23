const sortReorder = (sorts, indexA, indexB) => {
  const _sorts = [...sorts];
  const item = _sorts.splice(indexA, 1)[0];
  _sorts.splice(indexB, 0, item);
  return _sorts;
};

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_COLUMN":
      return [...state, payload.column];
    case "REMOVE_COLUMN":
      return state.filter((column) => column.id !== payload.id);
    case "CHARGE_ORDER_LIST":
      return sortReorder(state, payload.dragging, payload.target);

    default:
      return state;
  }
};

export default reducer;
