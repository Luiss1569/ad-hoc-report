import { memo, useCallback, forwardRef, useState } from "react";
import { Button, Snackbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Download";
import Spinner from "@mui/material/CircularProgress";

import api from "../../../services/api";
import MuiAlert from "@mui/material/Alert";
import { useFiltersContext } from "../../../contexts/Filters";
import { useSortsContext } from "../../../contexts/Sorts";
import { useColumnsContext } from "../../../contexts/Columns";

const ButtonRequest = () => {
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    message: "",
  });

  const [filters] = useFiltersContext();
  const [sorts] = useSortsContext();
  const [columns] = useColumnsContext();

  const [snackbar, setSnackbar] = useState({
    type: "success",
    message: "",
    open: false,
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const reduceSorts = (_sorts) => {
    const orders = {
      asc: "ASC",
      desc: "DESC",
    };

    return _sorts.reduce((acc, curr) => {
      const { column, order } = curr;

      const obj = [column, orders[order]];

      acc.push(obj);

      return acc;
    }, []);
  };

  const reduceColumns = (_columns) => {
    return _columns.reduce((acc, curr) => {
      const { field, table } = curr;

      if (Object.keys(acc).includes(table)) {
        acc[table].push(field);
      } else {
        acc[table] = [field];
      }

      return acc;
    }, {});
  };

  const request = useCallback(async () => {
    setStatus((prev) => ({ ...prev, loading: true }));

    setSnackbar((prev) => ({ ...prev, open: true, message: "Start Download", type: "info" }));

    await api
      .post(`/monster/export`, {
        filters,
        sorts: reduceSorts(sorts),
        columns: reduceColumns(columns),
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/csv",
        });

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = URL.createObjectURL(blob);
        a.download = "monster.csv";
        a.click();
        document.body.removeChild(a);

        setSnackbar((prev) => ({
          ...prev,
          type: "success",
          message: "Download Success",
          open: true,
        }));
      })
      .catch((error) => {
        setStatus((prev) => ({
          ...prev,
          error: true,
          message: error.message,
        }));
        setSnackbar((prev) => ({
          ...prev,
          type: "error",
          message: error.response?.data?.message || error.message,
          open: true,
        }));
      })
      .finally(() => {
        setStatus((prev) => ({ ...prev, loading: false }));
      });
  }, [filters, sorts, columns]);

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded"
        onClick={request}
        variant="contained"
        disabled={status.loading}
      >
        {status.loading ? <Spinner size={20} /> : <SearchIcon />}
      </Button>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(ButtonRequest);

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
