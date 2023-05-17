import { memo, useCallback, useState } from "react";
import { Button, Popover } from "@mui/material";

import Filter from "./Fields";
import Select from "@/components/Atoms/Select";

const GroupFilter = ({ filters, onChange: setFilters }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const searchFilter = useCallback((id, filters) => {
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
  }, []);

  const handleChangeFilter = useCallback(
    (id, filter) => {
      setFilters((filters) => {
        const found = searchFilter(id, filters);
        Object.assign(found, filter);
        return [...filters];
      });
    },
    [searchFilter, setFilters]
  );

  const handleRemoveFilter = useCallback(
    (id) => {
      setFilters((filters) => {
        if (filters.length === 1) return filters;

        const recursive = (filters) => {
          for (const filter of filters) {
            if (filter.id === id) {
              filters.splice(filters.indexOf(filter), 1);
              return true;
            }
            if (filter.length) {
              const found = recursive(filter);
              if (found) return true;
            }
          }
        };

        recursive(filters);

        return [...filters];
      });
    },
    [setFilters]
  );

  const handleAddFilter = useCallback(
    (id) => {
      setFilters((filters) => {
        const recursive = (filters) => {
          for (let i = 0; i < filters.length; i++) {
            const filter = filters[i];
            if (filter.id === id) {
              filters.splice(i + 1, 0, {
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

        recursive(filters);

        return [...filters];
      });
    },
    [setFilters]
  );

  const newFilter = useCallback(
    (father, idx) => {
      setFilters((filters) => {
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
          filters.push(filter);
        }

        return [...filters];
      });
    },
    [setFilters]
  );

  const handleTurnGroup = useCallback(
    (id) => {
      setFilters((filters) => {
        const searchFather = (filters) => {
          for (const filter of filters) {
            if (filter.id === id) return filters;
            if (filter.length) {
              const found = searchFather(filter);
              if (found) return found;
            }
          }
        };

        const father = searchFather(filters);
        const found = searchFilter(id, filters);

        const index = father.indexOf(found);

        father[index] = [found];

        return [...filters];
      });
    },
    [searchFilter, setFilters]
  );

  const renderRecursive = useCallback(
    (filters) => {
      return filters.map((filter, idx, arr) => {
        if (filter.length) {
          return (
            <RenderRecursive
              key={filter.id}
              newFilter={newFilter}
              filters={filters}
              index={idx}
              length={arr.length}
              handleChangeFilter={handleChangeFilter}
            >
              {renderRecursive(filter)}
            </RenderRecursive>
          );
        }
        return (
          <FilterField
            key={filter.id}
            filter={filter}
            index={idx}
            length={arr.length}
            handleChangeFilter={handleChangeFilter}
            handleRemoveFilter={handleRemoveFilter}
            handleAddFilter={handleAddFilter}
            handleTurnGroup={handleTurnGroup}
          />
        );
      });
    },
    [
      handleChangeFilter,
      handleRemoveFilter,
      handleAddFilter,
      handleTurnGroup,
      newFilter,
    ]
  );
  return (
    <div>
      <Button
        size="small"
        onClick={handleClick}
        variant="outlined"
        aria-describedby="filter-popover"
      >
        Open Filter
      </Button>

      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        id="filter-popover"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <div className="p-4">
          <label className="text-sm">Where</label>
          <div className="flex flex-col space-y-1">
            {renderRecursive(filters)}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default memo(GroupFilter);

const LogicalOperator = ({ index, length, filter, onChange }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(filter.id, { ...filter, logic: e.target.value });
    },
    [filter, onChange]
  );

  if (index === length - 1) return null;

  return (
    <Select
      className="w-20"
      value={filter.logic}
      size="small"
      label="Logical"
      onChange={handleChange}
      options={[
        { label: "And", value: "and" },
        { label: "Or", value: "or" },
      ]}
    />
  );
};

const FilterField = ({
  filter,
  index,
  length,
  handleChangeFilter,
  handleRemoveFilter,
  handleAddFilter,
  handleTurnGroup,
}) => {
  return (
    <>
      <div>
        <Filter
          key={filter.id}
          filter={filter}
          onChange={handleChangeFilter}
          onRemove={handleRemoveFilter}
          onAdd={handleAddFilter}
          onTurnGroup={handleTurnGroup}
        />
      </div>
      <LogicalOperator
        index={index}
        length={length}
        filter={filter}
        onChange={handleChangeFilter}
      />
    </>
  );
};

const RenderRecursive = ({
  children,
  filters,
  newFilter,
  index,
  length,
  handleChangeFilter,
}) => {
  return (
    <>
      <div className="p-3">
        <div
          key={new Date()}
          className="flex flex-col bg-gray-100 p-1 w-min border border-blue-300 rounded-md"
        >
          <label className="text-sm">Where</label>
          {children}
        </div>
        <LogicalOperator
          index={index}
          length={length}
          filter={filters[length - 1]}
          onChange={handleChangeFilter}
        />
        <Button
          size="small"
          onClick={() => newFilter(filters, index)}
          className="mt-1"
        >
          Add
        </Button>
      </div>
    </>
  );
};
