import { memo, useCallback, useMemo, useState } from "react";
import { Button, Divider, Popover } from "@mui/material";

import Fields from "../../../../../configs/fields.json";
import { useColumnsContext } from "../../../../../contexts/Columns";
import { addColumn } from "../../../../../contexts/Columns/actions";

const fields = Object.keys(Fields);

const AddSortsComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          {fields.map((sort) => (
            <Item key={sort} item={sort} />
          ))}
        </div>
      </Popover>
    </>
  );
};

export default memo(AddSortsComponent);

const Item = ({ item }) => {
  const [columns, dispatch] = useColumnsContext();

  const items = useMemo(() => {
    return Object.entries(Fields[item]).filter(
      ([key]) => !columns.find(({ column }) => column === `${item}.${key}`)
    );
  }, [item, columns]);

  const handleAdd = useCallback(
    (table, columns) => {
      dispatch(
        addColumn({
          column: `${table}.${columns}`,
          visible: true,
          id: Math.random().toString(36).substring(7),
        })
      );
    },
    [dispatch]
  );

  return (
    <div className="">
      <span className="text-sm font-semibold px-2 py-2">{item}</span>
      <div className="flex flex-col max-h-40 overflow-y-auto">
        {items.map(([column]) => (
          <div
            key={column}
            className="flex items-center justify-start w-full h-8 px-2 cursor-pointer hover:bg-gray-200"
            onClick={() => handleAdd(item, column)}
          >
            <span>{column}</span>
            <Divider />
          </div>
        ))}
        {!items.length && (
          <div className="flex items-center justify-start w-full h-8 px-2">
            <span>No Columns</span>
          </div>
        )}
      </div>
    </div>
  );
};
