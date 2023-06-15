import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/icons-material/AddBoxSharp";
import React, { memo, useMemo } from "react";

const MonstersComponent = ({ data }) => {
  const tableColumns = useMemo(() => {
    return Object.keys(data?.[0] || {}) || [];
  }, [data]);

  if (!data?.length) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl font-bold text-gray-500">
          No Data
          <IconButton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <TableContainer className="max-h-[88vh] overflow-y-auto">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableColumns?.map((column) => (
                  <TableCell key={column} className="capitalize min-w-60">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  <Row item={item} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default memo(MonstersComponent);

const Row = ({ item }) => {
  const fields = useMemo(() => Object.values(item), [item]);

  return fields.map((el) => (
    <TableCell key={el}>
      <Field item={el} />
    </TableCell>
  ));
};

const Field = ({ item }) => {
  if (!item) return <div>None</div>;

  if (Array.isArray(item)) {
    return item.map((el) => (
      <>
        <Field item={el} />
        <Divider />
      </>
    ));
  }

  if (typeof item === "object") {
    return Object.entries(item).map(([key, value]) => (
      <div key={key} className="flex flex-row space-x-2">
        <span className="capitalize font-bold">{key}:</span>
        <Field item={value} />
      </div>
    ));
  }

  return <div>{item}</div>;
};
