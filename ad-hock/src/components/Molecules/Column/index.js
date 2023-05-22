import { memo, useState } from "react";
import { Button, Popover } from "@mui/material";

import List from "./components/List";
import AddColumn from "./components/addColumn";

const ColumnsList = () => {
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
        Open Columns
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
        <div className="flex flex-col gap-2 p-2">
          <List />
          <AddColumn />
        </div>
      </Popover>
    </>
  );
};

export default memo(ColumnsList);
