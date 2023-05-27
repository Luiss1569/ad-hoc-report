import { memo, useCallback, useRef, useState } from "react";
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

import Select from "../../../../Atoms/Select";
import { useSortsContext } from "../../../../../contexts/Sorts";
import {
  changeSort,
  chargeOrderList,
  removeSort,
} from "../../../../../contexts/Sorts/actions";

const ListSortComponent = () => {
  const dragItem = useRef();
  const dragNode = useRef();
  const [_, setDragging] = useState(new Date().getTime());
  const [sorts, dispatch] = useSortsContext();

  const handleDragStart = useCallback((e, item) => {
    dragItem.current = item;
    setDragging(new Date().getTime());
  }, []);

  const handleDragEnter = useCallback(
    (e, item) => {
      const dragging = sorts.findIndex(
        (sort) => sort?.column === dragItem?.current?.column
      );
      const target = sorts.findIndex((sort) => sort?.column === item?.column);

      if (dragNode.current?.column === item?.column) return;
      if (dragItem.current?.column === item?.column) return;

      dragNode.current = target?.column;
      dispatch(chargeOrderList(dragging, target));

      setDragging(new Date().getTime());
    },
    [dispatch, sorts]
  );

  const handleDragEnd = useCallback((e) => {
    setDragging(new Date().getTime());
    dragItem.current = null;
    dragNode.current = null;
  }, []);

  return (
    <>
      <List className=" w-80 transition-all duration-300 ease-in-out">
        {sorts.map((item, index) => (
          <Item
            key={item?.id}
            item={item}
            index={index}
            isDragging={dragItem?.current?.column === item?.column}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragEnd={handleDragEnd}
          />
        ))}
      </List>
    </>
  );
};

export default memo(ListSortComponent);

const orderOptions = [
  { value: "asc", label: "Asc" },
  { value: "desc", label: "Des" },
];

const Item = ({
  item,
  index,
  isDragging,
  onDragStart,
  onDragEnter,
  onDragEnd,
}) => {
  const [, dispatch] = useSortsContext();

  const handleChange = useCallback(
    (e) => {
      dispatch(changeSort(item.id, e.target.value));
    },
    [dispatch, item]
  );

  const handleRemove = useCallback(() => {
    dispatch(removeSort(item.id));
  }, [dispatch, item]);

  const handleDragStart = useCallback(
    (e) => {
      onDragStart(e, item);
    },
    [onDragStart, item]
  );

  const handleDragEnter = useCallback(
    (e) => {
      onDragEnter(e, item);
    },
    [onDragEnter, item]
  );

  const handleDragEnd = useCallback(
    (e) => {
      onDragEnd(e, item);
    },
    [onDragEnd, item]
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  if (!item) return null;

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      className={`${isDragging ? "bg-gray-200" : ""}`}
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
