import React from "react";
import {
  TableRow,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  Button,
  Paper,
  IconButton
} from "@mui/material";
import { TableHeader } from "../TableHeader/TableHeader";
import { deviceInformation } from "../../../src/mock-data";
import DoneIcon from "@mui/icons-material/Done";
import RevertIcon from "@mui/icons-material/Refresh";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import RowTableCell from "../RowTableCell/RowTableCell";
// import AddDevices from "../AddDevice/AddDevices";

const useStyle = makeStyles({
  body: {
    width: "95%",
    margin: 50,
    marginTop: 50,
    justifyContent: "center",
    position: "relative",
    
  },
  table: {
    margin: "50",
  },
  button: {
    width: 150,
    height: 35,
    padding: 20
  },
  text: {
    textAlign: "center"
  }
});

function descendingComparator(a, b) {
  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return (a, b) => {
    let valueA = a[orderBy];
    let valueB = b[orderBy];

    if (orderBy === "hdd_capicity") {
      valueA = parseInt(valueA, 10);
      valueB = parseInt(valueB, 10);
    }
    return order === "desc"
      ? descendingComparator(valueA, valueB)
      : -descendingComparator(valueA, valueB);
  };
}

const sortedRowInformation = (rowArray, comparator) => {
  const stabilizeRowArray = rowArray.map((el, index) => [el, index]);
  stabilizeRowArray.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizeRowArray.map((el) => el[0]);
};

export const TableContent = () => {
  const classes = useStyle();
  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [valueToOrder, setValueToOrder] = React.useState("");
  const [list, setList] = React.useState(createTableData());
  const [searched, setSearched] = React.useState("");
  const [previous, setPrevious] = React.useState({});

  function handleRemove(id) {
    const newList = list.filter((item, index) => index !== id);

    setList(newList);
  }

  function createTableData() {
    return deviceInformation.map((value) => {
      return { ...value, isEditMode: false };
    });
  }

  const onToggleEditMode = (id) => {
    setList((state) => {
      return list.map((row) => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };
  const onRevert = (id) => {
    const newList = list.map((row) => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setList(newList);
    setPrevious((state) => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  const handleSortDirection = (event, property) => {
    const isAscending = valueToOrder === property && orderDirection === "asc";
    setValueToOrder(property);
    setOrderDirection(isAscending ? "desc" : "asc");
  };

  const handleSystemNameChange = (event, row) => {
    const newList = list.map((_row) => {
      if (_row.id === row.id) {
        return { ..._row, system_name: event.target.value };
      }
      return _row;
    });
    setList(newList);
  };
  const handleDeviceTypeChange = (event, row) => {
    const newList = list.map((_row) => {
      if (_row.id === row.id) {
        return { ..._row, device_type: event.target.value };
      }
      return _row;
    });
    setList(newList);
  };
  const handleHDDCapacityChange = (event, row) => {
    const newList = list.map((_row) => {
      if (_row.id === row.id) {
        return { ..._row, hdd_capicity: event.target.value };
      }
      return _row;
    });
    setList(newList);
  }
    return (
      <Paper className={classes.body}>
        <h1 className={classes.text}>Device Information</h1>
        <SearchBar
          value={searched}
          onChange={(event) => {
            console.log("event", event);
            setSearched(event);
            console.log("d1", searched);
          }}
        />
        <TableContainer className={classes.table}>
          <Table>
            <TableHeader
              valueToOrder={valueToOrder}
              orderDirection={orderDirection}
              handleSortDirection={handleSortDirection}
            />
            <TableBody>
              {sortedRowInformation(
                list,
                getComparator(orderDirection, valueToOrder)
              )
                .filter((devices) => {
                  // console.log("d", searched)
                  if (searched === "" || searched === undefined) {
                    return devices;
                  } else if (
                    devices.device_type
                      .toLowerCase()
                      .includes(searched.toLowerCase()) ||
                    devices.system_name
                      .toLowerCase()
                      .includes(searched.toLowerCase()) ||
                    devices.hdd_capicity
                      .toLowerCase()
                      .includes(searched.toLowerCase())
                  ) {
                    return devices;
                  } else {
                    return "";
                  }
                })
                .map((device, index) => (
                  <TableRow key={index}>
                    <RowTableCell
                      row={device}
                      dataList="system_name"
                      onChange={handleSystemNameChange}
                    />
                    <RowTableCell
                      row={device}
                      dataList="device_type"
                      onChange={handleDeviceTypeChange}
                    />
                    <RowTableCell
                      row={device}
                      dataList="hdd_capicity"
                      onChange={handleHDDCapacityChange}
                    />
                    <TableCell>
                      {device.isEditMode ? (
                        <>
                          {/* <RowTableCell /> */}
                          <IconButton
                            aria-label="done"
                            onClick={() => onToggleEditMode(device.id)}
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            aria-label="revert"
                            onClick={() => onRevert(device.id)}
                          >
                            <RevertIcon />
                          </IconButton>
                        </>
                      ) : (
                        <>
                          <IconButton
                            aria-label="delete"
                            onClick={() => onToggleEditMode(device.id)}
                          >
                            <EditIcon />
                          </IconButton>
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <DeleteIcon onClick={() => handleRemove(index)} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Button component={Link} to="/AddDevices" className={classes.button}>
            Add New Device
          </Button>
        </TableContainer>

        {/* <AddDevices deviceList={list} setDeviceList={setList} /> */}
      </Paper>
    );
  };
