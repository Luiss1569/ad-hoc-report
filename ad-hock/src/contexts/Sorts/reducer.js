const sortReorder = (sorts, indexA, indexB) => {
  const _sorts = [...sorts];
  const item = _sorts.splice(indexA, 1)[0];
  _sorts.splice(indexB, 0, item);
  return _sorts;
};

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_SORT":
      return [...state, payload.sort];
    case "REMOVE_SORT":
      return state.filter((sort) => sort.id !== payload.id);
    case "CHANGE_SORT":
      return state.map((sort) => {
        if (sort.id === payload.id) {
          return {
            ...sort,
            order: payload.order,
          };
        }
        return sort;
      });
    case "CHARGE_ORDER_LIST":
      return sortReorder(state, payload.dragging, payload.target);

    default:
      return state;
  }
};

export default reducer;
