"use client";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import Fields from "./fields.json";
import Operators from "./operators.json";
import Select from "../../Select";
import {
  MenuItem,
  Input,
  FormControl,
  InputLabel,
  Menu,
  Fab,
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const tables = Object.entries(Fields);

const optionsField = tables
  .map(([table, fields]) =>
    Object.keys(fields).map((field) => ({
      value: `${table}.${field}`,
      label: `${table}.${field}`,
    }))
  )
  .flat();

const Filter = ({
  filter: { id, field: _field, operator: _operator, value: _value } = {},
  onChange,
  onRemove,
  onTurnGroup,
  onTurnFilter,
  onAdd,
}) => {
  const [field, setField] = useState(_field);
  const [operator, setOperator] = useState(_operator);
  const [value, setValue] = useState(_value);

  const optionsOperator = useMemo(() => {
    if (!field) return [];
    return Object.values(Operators[field.type] || {});
  }, [field]);

  const handleChangeField = useCallback((e) => {
    e.preventDefault();
    const { value } = e.target;
    const [table, field] = value.split(".") || [];
    const data = Fields[table]?.[field];

    setField({
      value,
      table,
      field,
      ...data,
    });
    setOperator("");
  }, []);

  const handleChangeOperator = useCallback((e) => {
    e.preventDefault();
    const { value } = e.target;
    setOperator(value);
  }, []);

  const handleChangeValue = useCallback((e) => {
    e.preventDefault();
    const { value } = e.target;
    setValue(value);
  }, []);

  useEffect(() => {
    if (!id) return;
    if (field !== _field || operator !== _operator || value !== _value) {
      onChange(id, { field, operator, value });
    }
  }, [field, operator, value, onChange, id, _field, _operator, _value]);

  return (
    <div className="flex items-center space-x-2 p-5">
      <Select
        value={field?.value || ""}
        onChange={handleChangeField}
        label="Field"
        size="small"
        className="w-40"
        name="field"
        options={optionsField}
      />
      <Select
        value={operator}
        className="w-40"
        onChange={handleChangeOperator}
        size="small"
        label="Operator"
        name="operator"
        disabled={!field}
        options={optionsOperator}
      />

      {field?.type === "enum" && (
        <Select
          value={value}
          className="w-40"
          onChange={handleChangeValue}
          size="small"
          label="Value"
          name="value"
          disabled={!field}
          options={field?.options.map((value) => ({
            value,
            label: value,
          }))}
        />
      )}

      {field?.type !== "enum" && (
        <FormControl className="w-40" variant="filled">
          <InputLabel id="demo-simple-select-label">Value</InputLabel>
          <Input
            onBlurCapture={handleChangeValue}
            defaultValue={value}
            label="Value"
            placeholder="Select a value"
            disabled={!field}
          />
        </FormControl>
      )}

      <FilterMenu
        id={id}
        onAdd={onAdd}
        onRemove={onRemove}
        onTurnGroup={onTurnGroup}
      />
    </div>
  );
};

export default memo(Filter);

const FilterMenu = ({ id, onAdd, onRemove, onTurnGroup }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = useCallback(() => {
    handleClose();
    onRemove(id);
  }, [onRemove, id]);

  const handleAdd = useCallback(() => {
    handleClose();
    onAdd(id);
  }, [onAdd, id]);

  const handleTurnGroup = useCallback(() => {
    handleClose();
    onTurnGroup(id);
  }, [onTurnGroup, id]);

  return (
    <>
      <Fab
        size="small"
        className="ml-2 bg-none hover:bg-gray-300 transition-colors duration-200 ease-in-out shadow-none"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </Fab>
      <Menu
        id="basic-menu"
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleAdd}>Add</MenuItem>
        <MenuItem onClick={handleRemove}>Remove</MenuItem>
        <MenuItem onClick={handleTurnGroup}>Turn into group</MenuItem>
      </Menu>
    </>
  );
};
