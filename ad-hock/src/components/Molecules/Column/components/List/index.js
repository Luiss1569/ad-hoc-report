import { memo, useCallback, useRef, useState } from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import VisibilityIcon from "@mui/icons-material/VisibilityRounded";
import { useColumnsContext } from "@/contexts/Columns";
import { changeOrderList, removeColumn } from "@/contexts/Columns/actions";

const ListSortComponent = () => {
  const dragItem = useRef();
  const dragNode = useRef();
  const [, setDragging] = useState(new Date().getTime());

  const [columns, dispatch] = useColumnsContext();

  const handleDragStart = useCallback((e, item) => {
    dragItem.current = item;
    setDragging(new Date().getTime());
  }, []);

  const handleDragEnter = useCallback(
    (e, item) => {
      const dragging = columns.findIndex(
        (column) => column?.column === dragItem?.current?.column
      );
      const target = columns.findIndex(
        (column) => column?.column === item?.column
      );

      if (dragNode.current?.column === item?.column) return;
      if (dragItem.current?.column === item?.column) return;

      dragNode.current = target?.column;
      dispatch(changeOrderList(dragging, target));

      setDragging(new Date().getTime());
    },
    [columns, dispatch]
  );

  const handleDragEnd = useCallback((e) => {
    setDragging(new Date().getTime());
    dragItem.current = null;
    dragNode.current = null;
  }, []);

  return (
    <>
      <List className=" w-80 transition-all duration-300 ease-in-out">
        {columns.map((item, index) => (
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

const Item = ({ item, isDragging, onDragStart, onDragEnter, onDragEnd }) => {
  const [, dispatch] = useColumnsContext();

  const handleRemove = useCallback(() => {
    dispatch(removeColumn(item.id));
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
          <Button
            size="small"
            className="text-gray-500 hover:text-gray-700"
            onClick={handleRemove}
          >
            <VisibilityIcon sx={{ fontSize: 16 }} />
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider />
    </div>
  );
};
