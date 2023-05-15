"use client";

import { memo, useCallback, useState } from "react";
import { Button, Popover } from "@mui/material";

import Fields from "@/configs/fields.json";
import { CheckBox } from "@mui/icons-material";

const fields = Object.entries(Fields)
  .map(([table, fields]) =>
    Object.entries(fields).map(([field, data]) => ({
      value: `${table}.${field}`,
      ...data,
    }))
  )
  .flat()
  .filter((field) => field?.sort);

const SortableList = ({ sorts, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const sortsOptions = fields.filter(
    (a) => !sorts.find((b) => a.value === b?.column)
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const addSort = useCallback(
    (sort) => {
      onChange([
        ...sorts,
        {
          column: sort.value,
          order: "asc",
          id: Math.random().toString(36).substring(7),
        },
      ]);
    },
    [sorts, onChange]
  );

  return (
    <>
      <Button
        size="small"
        onClick={handleClick}
        variant="outlined"
        aria-describedby="filter-popover"
      >
        Add Sort
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
        <div className="w-40">
          {sortsOptions.map((sort) => (
            <div
              key={sort.value}
              className="flex items-center justify-start w-full h-8 px-2 cursor-pointer hover:bg-gray-100"
              onClick={() => addSort(sort)}
            >
              <span>{sort.value}</span>
            </div>
          ))}
          {!sortsOptions.length && (
            <div className="flex items-center justify-start w-full h-8 px-2">
              <span>No Sorts</span>
            </div>
          )}
        </div>
      </Popover>
    </>
  );
};

export default memo(SortableList);
