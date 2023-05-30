import { memo, useCallback, useState } from "react";
import { Button, Popover } from "@mui/material";

import Filter from "./Fields";
import Select from "../../../components/Atoms/Select";

import { useFiltersContext } from "../../../contexts/Filters";
import { changeFilter } from "../../../contexts/Filters/actions";

const GroupFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters] = useFiltersContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderRecursive = useCallback((filters) => {
    return filters.map((filter, idx, arr) => {
      if (filter.length) {
        return (
          <RenderRecursive
            key={filter.id}
            filters={filters}
            index={idx}
            length={arr.length}
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
          logic={arr[0].logic}
        />
      );
    });
  }, []);
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

const LogicalOperator = ({ index, length, filter, logic }) => {
  const [, dispatch] = useFiltersContext();

  const handleChange = useCallback(
    (e) => {
      dispatch(
        changeFilter(filter.id, {
          ...filter,
          logic: e.target.value,
        })
      );
    },
    [filter, dispatch]
  );

  if (index === length - 1) return null;

  return (
    <Select
      className="w-20"
      value={filter.logic || logic}
      size="small"
      label="Logical"
      onChange={handleChange}
      disabled={index}
      options={[
        { label: "And", value: "and" },
        { label: "Or", value: "or" },
      ]}
    />
  );
};

const FilterField = ({ filter, index, length, logic }) => {
  return (
    <>
      <div>
        <Filter key={filter.id} filter={filter} />
      </div>
      <LogicalOperator
        index={index}
        length={length}
        filter={filter}
        logic={logic}
      />
    </>
  );
};

const RenderRecursive = ({ children, filters, index, length }) => {
  const [, dispatch] = useFiltersContext();

  const handleNewFilter = useCallback(
    (father, index) => {
      dispatch(changeFilter(father.id, index));
    },
    [dispatch]
  );

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
          logic={filters[0].logic}
        />
        <Button
          size="small"
          onClick={() => handleNewFilter(filters, index)}
          className="mt-1"
        >
          Add
        </Button>
      </div>
    </>
  );
};
