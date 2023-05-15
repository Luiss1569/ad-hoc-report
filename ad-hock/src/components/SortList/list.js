"use client";

import { memo, useCallback } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";

import Select from "../Select";
import { ReactSortable } from "react-sortablejs";

const SortableList = ({ sorts, onChange }) => {
  const handleChangeOrder = useCallback(
    (item, order) => {
      onChange((_sorts) => {
        return _sorts.map((sort) => {
          if (sort?.column === item.column) {
            return {
              ...sort,
              order,
            };
          }

          return sort;
        });
      });
    },
    [onChange]
  );

  const handleRemove = useCallback(
    (item) => {
      onChange((_sorts) => {
        return _sorts.filter((sort) => sort?.column !== item.column);
      });
    },
    [onChange]
  );

  const handleSort = useCallback(
    (item) => {
      onChange(item.filter((sort) => sort));
    },
    [onChange]
  );

  return (
    <>
      <List className=" w-80">
        {
          <ReactSortable list={sorts} setList={handleSort}>
            {sorts.map((item) => (
              <Item
                key={item?.id}
                item={item}
                onChange={handleChangeOrder}
                onRemove={handleRemove}
              />
            ))}
          </ReactSortable>
        }
      </List>
    </>
  );
};

export default memo(SortableList);

const orderOptions = [
  { value: "asc", label: "Asc" },
  { value: "desc", label: "Des" },
];

const Item = ({ item, onChange, onRemove }) => {
  const handleChange = useCallback(
    (e) => {
      onChange(item, e.target.value);
    },
    [onChange, item]
  );

  const handleRemove = useCallback(() => {
    onRemove(item);
  }, [onRemove, item]);

  if (!item) return null;

  return (
    <>
      <ListItem key={item.id} className="px-2 py-2">
        <ListItemIcon>
          <DragHandleIcon />
        </ListItemIcon>
        <ListItemText primary={item.column} className="no-underline" />
        <ListItemSecondaryAction className="flex items-center gap-2">
          <Select
            value={item.order}
            size="small"
            className="p-0"
            notNoneOption
            variant="outlined"
            options={orderOptions}
            onChange={handleChange}
          />
          <div
            size="small"
            onClick={handleRemove}
            variant="outlined"
            aria-describedby="filter-popover"
          >
            <DeleteIcon
              sx={{ color: "red" }}
              className="cursor-pointer font-size-8"
            />
          </div>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </>
  );
};
