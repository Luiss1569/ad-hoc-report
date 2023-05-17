"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
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

const SortableList = ({ sorts, onChange }) => {
  const dragItem = useRef();
  const dragNode = useRef();
  const [_, setDragging] = useState(new Date().getTime());

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

  const sortsSwap = useCallback((sorts, indexA, indexB) => {
    const _sorts = [...sorts];
    [_sorts[indexA], _sorts[indexB]] = [_sorts[indexB], _sorts[indexA]];
    return _sorts;
  }, []);

  const handleDragStart = useCallback((e, index) => {
    dragItem.current = index;
    setDragging(new Date().getTime());
  }, []);

  const handleDragEnter = useCallback((e, index) => {
    dragNode.current = index;
    setDragging(new Date().getTime());
  }, []);

  const handleDragEnd = useCallback(
    (e) => {
      onChange((_sorts) => {
        return sortsSwap(_sorts, dragItem.current, dragNode.current);
      });
      setDragging(new Date().getTime());
      dragItem.current = null;
      dragNode.current = null;
    },
    [onChange, sortsSwap]
  );

  return (
    <>
      <List className=" w-80 transition-all duration-300 ease-in-out">
        {sorts.map((item, index) => (
          <Item
            key={item?.id}
            item={item}
            index={index}
            isDragging={dragItem.current === index}
            isTarget={dragNode.current === index}
            onChange={handleChangeOrder}
            onRemove={handleRemove}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ))}
      </List>
    </>
  );
};

export default memo(SortableList);

const orderOptions = [
  { value: "asc", label: "Asc" },
  { value: "desc", label: "Des" },
];

const Item = ({
  item,
  index,
  isDragging,
  isTarget,
  onChange,
  onRemove,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const handleChange = useCallback(
    (e) => {
      onChange(item, e.target.value);
    },
    [onChange, item]
  );

  const handleRemove = useCallback(() => {
    onRemove(index);
  }, [onRemove, index]);

  const handleDragStart = useCallback(
    (e) => {
      onDragStart(e, index);
    },
    [onDragStart, index]
  );

  const handleDragEnter = useCallback(
    (e) => {
      onDragEnter(e, index);
    },
    [onDragEnter, index]
  );

  if (!item) return null;

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      className={`${isDragging ? "bg-gray-100" : ""} ${
        isTarget ? "bg-gray-200" : ""
      }`}
    >
      <ListItem key={item.id} className="px-2 py-2">
        <ListItemIcon className="cursor-pointer">
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
    </div>
  );
};
