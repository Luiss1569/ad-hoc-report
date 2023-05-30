import { memo, useCallback, forwardRef, useState } from "react";
import { Button, Snackbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Spinner from "@mui/material/CircularProgress";

import api from "../../../services/api";
import MuiAlert from "@mui/material/Alert";
import { useFiltersContext } from "../../../contexts/Filters";
import { useSortsContext } from "../../../contexts/Sorts";
import { useColumnsContext } from "../../../contexts/Columns";

const ButtonRequest = ({ setData }) => {
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

  const request = useCallback(async () => {
    setStatus((prev) => ({ ...prev, loading: true }));

    await api
      .post(`/monster`, {
        filters,
        sorts,
        columns,
      })
      .then((response) => {
        setData({
          metadata: {
            count: response.data.count,
            page: response.data.page,
            limit: response.data.limit,
          },
          data: response.data.data,
        });

        if (!response.data.count) {
          setSnackbar((prev) => ({
            ...prev,
            type: "warning",
            message: "No data found",
            open: true,
          }));
        } else {
          setSnackbar((prev) => ({
            ...prev,
            type: "success",
            message: "Success",
            open: true,
          }));
        }
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
          message: error.message,
          open: true,
        }));
      })
      .finally(() => {
        setStatus((prev) => ({ ...prev, loading: false }));
      });
  }, [setData, filters, sorts, columns]);

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
