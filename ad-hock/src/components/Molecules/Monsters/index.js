import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import IconButton from "@mui/icons-material/AddBoxSharp";
import React, { memo, useMemo } from "react";
import { useColumnsContext } from "../../../contexts/Columns";

const MonstersComponent = ({ data }) => {
  const [columns] = useColumnsContext();

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
      <div className="flex flex-col justify-center items-center p-4">
        <Table>
          <TableHead>
            <TableRow></TableRow>
            <TableRow>
              {tableColumns?.map((column) => (
                <TableCell key={column} className="capitalize">
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
      </div>
    </>
  );
};

export default memo(MonstersComponent);

const Row = ({ item }) => {
  const fields = useMemo(() => Object.values(item), [item]);

  return fields.map((el) => <Field item={el} key={el} />);
};

const Field = ({ item }) => {
  if (Array.isArray(item)) {
    return (
      <TableCell>
        {item.map((el) => (
          <div key={el.name}>
            {Object.entries(el).map(([key, value]) => (
              <li key={key}>
                {key}:{value}
              </li>
            ))}
            <Divider />
          </div>
        ))}
      </TableCell>
    );
  }

  return <TableCell>{item}</TableCell>;
};
