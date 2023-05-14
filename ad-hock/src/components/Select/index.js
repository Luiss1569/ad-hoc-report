import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { memo, useMemo } from "react";

const Select = ({ options: _options, ...props }) => {
  const options = useMemo(() => {
    const none = { value: "", label: "None", disabled: true };

    if (_options?.length > 0) {
      return [none, ..._options.flat()];
    }

    return [none];
  }, [_options]);

  return (
    <FormControl>
      <InputLabel>{props?.label}</InputLabel>
      <MuiSelect {...props}>
        {options?.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option?.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default memo(Select);
