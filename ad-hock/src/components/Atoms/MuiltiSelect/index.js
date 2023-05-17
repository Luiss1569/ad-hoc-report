import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select as MuiSelect,
} from "@mui/material";
import { memo, useMemo } from "react";

const colors = ["primary", "secondary", "error", "warning", "info", "success"];

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
      <MuiSelect
        {...props}
        multiple
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value, i) => (
              <Chip
                key={value}
                label={value}
                className="h-7"
                color={colors[i % 6]}
              />
            ))}
          </Box>
        )}
      >
        {options?.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option?.disabled}
            className="py-0"
          >
            <Checkbox checked={props?.value?.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default memo(Select);
