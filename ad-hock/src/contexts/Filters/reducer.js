const searchFilter = (data, groupId, id) => {
  const groups = data.filter((group) => group.groupId);
  const group = groups.find((group) => group.groupId === groupId);

  if (group) {
    if (!id) {
      return group;
    }

    const filter = group.data.find((filter) => filter.id === id);

    if (filter) {
      return group;
    }
  }

  for (const subGroup of groups) {
    const group = searchFilter(subGroup.data, groupId, id);

    if (group) {
      return group;
    }
  }
};

const searchFatherGroup = (data, groupId) => {
  const groups = data.filter((group) => group.groupId);
  const group = groups.find((group) => group.groupId === groupId);

  if (group) {
    return data;
  }

  for (const subGroup of groups) {
    const group = searchFatherGroup(subGroup.data, groupId);

    if (group) {
      return group;
    }
  }

  return null;
};

export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_FILTER": {
      const { groupId, id } = action.payload;

      const group = searchFilter(state, groupId, id);

      const newFilter = {
        id: new Date().getTime(),
        value: "",
        operator: "",
        field: "",
      };

      if (group) {
        const filterIdx = group.data.findIndex((filter) => filter.id === id);
        group.data.splice(filterIdx + 1, 0, newFilter);
      }
      return [...state];
    }
    case "CHANGE_FILTER": {
      const { groupId, id, filter } = action.payload;

      const group = searchFilter(state, groupId, id);

      if (group) {
        const filterIdx = group.data.findIndex((filter) => filter.id === id);
        group.data[filterIdx] = filter;
      }
      return [...state];
    }

    case "CHANGE_GROUP_LOGIC": {
      const { groupId, logic } = action.payload;

      const group = searchFilter(state, groupId);

      if (group) {
        group.logic = logic;
      }
      return [...state];
    }

    case "REMOVE_FILTER": {
      const { groupId, id } = action.payload;

      const group = searchFilter(state, groupId, id);

      if (group) {
        if (group.data.length === 1) {
          if (groupId == 1) {
            group.data = [];
          } else {
            const fatherGroup = searchFatherGroup(state, groupId);
            const filterIdx = fatherGroup.findIndex(
              (filter) => filter.groupId === groupId
            );

            fatherGroup.splice(filterIdx, 1, ...group.data);
          }
        } else {
          const filterIdx = group.data.findIndex((filter) => filter.id === id);
          group.data.splice(filterIdx, 1);
        }
      }
      return [...state];
    }

    case "TURN_GROUP": {
      const { groupId, id } = action.payload;

      const group = searchFilter(state, groupId, id);

      if (group) {
        const filterIdx = group.data.findIndex((filter) => filter.id === id);
        const filter = group.data[filterIdx];
        if (group.data.length > 1) {
          group.data.splice(filterIdx, 1, {
            groupId: new Date().getTime(),
            logic: "and",
            data: [
              {
                ...filter,
              },
            ],
          });
        }
      }
      return [...state];
    }

    case "RESET_FILTER": {
      return initialState;
    }

    case "NEW_FILTER": {
      const { groupId } = action.payload;

      const group = searchFilter(state, groupId);

      if (group) {
        group.data.push({
          id: new Date().getTime(),
          value: "",
          operator: "",
          field: "",
        });
      }
      return [...state];
    }
  }
}
