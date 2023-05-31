import { memo, useCallback, useState } from "react";
import { Button, Popover } from "@mui/material";

import Filter from "./Fields";
import Select from "../../../components/Atoms/Select";

import { useFiltersContext } from "../../../contexts/Filters";
import {
  changeFilter,
  changeGroupLogic,
  newFilter,
} from "../../../contexts/Filters/actions";

const GroupFilter = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [[filters]] = useFiltersContext();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderRecursive = useCallback((filters, fatherGroup) => {
    return filters.map((groups, idx) => {
      if (groups.groupId) {
        return (
          <RenderRecursive
            key={groups.groupId}
            fatherGroup={fatherGroup}
            index={idx}
          >
            {renderRecursive(groups.data, groups)}
          </RenderRecursive>
        );
      }
      return (
        <FilterField
          key={groups.id}
          index={idx}
          filter={groups}
          fatherGroup={fatherGroup || groups}
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
            {filters.data.length ? (
              renderRecursive(filters.data, filters)
            ) : (
              <AddFilter group={filters} index={0} />
            )}
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default memo(GroupFilter);

const LogicalOperator = ({ group, hidden, disable }) => {
  const [, dispatch] = useFiltersContext();

  const handleChange = useCallback(
    (e) => {
      dispatch(changeGroupLogic(group.groupId, e.target.value));
    },
    [group.groupId, dispatch]
  );

  if (hidden) return null;

  return (
    <Select
      className="w-20"
      value={group.logic}
      size="small"
      label="Logical"
      onChange={handleChange}
      disabled={disable}
      options={[
        { label: "And", value: "and" },
        { label: "Or", value: "or" },
      ]}
    />
  );
};

const FilterField = ({ filter, index, fatherGroup }) => {
  return (
    <>
      <div>
        <Filter key={filter.id} filter={filter} groupId={fatherGroup.groupId} />
      </div>
      <LogicalOperator
        id={filter.id}
        group={fatherGroup}
        hidden={index === fatherGroup.data?.length - 1}
        disable={index}
      />
    </>
  );
};

const RenderRecursive = ({ children, fatherGroup, index }) => {
  return (
    <>
      <div className="p-3">
        <div
          key={new Date()}
          className="flex flex-col bg-gray-100 p-1 w-min border border-blue-300 rounded-md mb-6"
        >
          <label className="text-sm">Where</label>
          {children}
        </div>
        <LogicalOperator
          index={index}
          group={fatherGroup}
          hidden={index === fatherGroup.data?.length - 1}
        />
        <AddFilter group={fatherGroup} index={index} />
      </div>
    </>
  );
};

const AddFilter = ({ group, index = 0 }) => {
  const [, dispatch] = useFiltersContext();

  const handleNewFilter = useCallback(() => {
    dispatch(newFilter(group.groupId, index));
  }, [dispatch, group.groupId, index]);

  return (
    <Button size="small" onClick={handleNewFilter} className="mt-1">
      Add
    </Button>
  );
};
