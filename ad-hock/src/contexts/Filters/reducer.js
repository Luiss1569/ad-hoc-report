const searchFilter = (id, filters) => {
  const recursive = (filters) => {
    for (const filter of filters) {
      if (filter.id === id) return filter;
      if (filter.length) {
        const found = recursive(filter);
        if (found) return found;
      }
    }
  };

  return recursive(filters);
};

export default function reducer(state, action) {
  switch (action.type) {
    case "CHANGE_FILTER": {
      const { id, filter } = action.payload;
      const found = searchFilter(id, state);
      Object.assign(found, filter);
      return [...state];
    }
    case "REMOVE_FILTER": {
      const { id } = action.payload;
      if (state.length === 1) return state;

      const recursive = (state) => {
        for (const filter of state) {
          if (filter.id === id) {
            state.splice(state.indexOf(filter), 1);
            return true;
          }
          if (filter.length) {
            const found = recursive(filter);
            if (found) return true;
          }
        }
      };

      recursive(state);

      return [...state];
    }
    case "ADD_FILTER": {
      const { id } = action.payload;
      const recursive = (state) => {
        for (let i = 0; i < state.length; i++) {
          const filter = state[i];
          if (filter.id === id) {
            state.splice(i + 1, 0, {
              id: new Date().getTime(),
              field: "",
              operator: "",
              value: "",
              logic: "and",
            });
            return true;
          }
          if (filter.length) {
            const found = recursive(filter);
            if (found) return true;
          }
        }
      };

      recursive(state);

      return [...state];
    }

    case "NEW_FILTER": {
      const { father, idx } = action.payload;
      const filter = {
        id: new Date().getTime(),
        field: "",
        operator: "",
        value: "",
        logic: "and",
      };

      if (father) {
        father.splice(idx + 1, 0, filter);
      } else {
        state.push(filter);
      }

      return [...state];
    }

    case "TURN_GROUP": {
      const { id } = action.payload;

      const searchFather = (state) => {
        for (const filter of state) {
          if (filter.id === id) return state;
          if (filter.length) {
            const found = searchFather(filter);
            if (found) return found;
          }
        }
      };

      const father = searchFather(state);
      const found = searchFilter(id, state);

      const index = father.indexOf(found);

      father[index] = [found];

      return [...state];
    }
    default:
      return state;
  }
}
