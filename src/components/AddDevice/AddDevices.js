import React from "react";
import { makeStyles } from "@mui/styles";
import { TextField, Button } from "@mui/material";
import { nanoid } from "nanoid";
import { deviceInformation } from "../../../src/mock-data";
import { Link } from "react-router-dom";

const useStyle = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: "block",
    width: "50%",
    height: 50,
    paddingTop: 20,
    border: "solid black 1"
  },
  form: {
    width: "95%",
    margin: 50,
    marginTop: 50,
    justifyContent: "center",
    position: "relative",
  },

  component: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },

  display: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  button: {
    left: "50%",
    width: 150,
    height: 35,
    padding: 20
  }
});

const AddDevices = () => {
  const classes = useStyle();
  const [list, setList] = React.useState(deviceInformation);
  const [addFormData, setAddFormData] = React.useState({
    system_Name: "",
    device_type: "",
    hdd_capacity: ""
  });

  const handleChangeForm = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newDataList = {
      id: nanoid(),
      system_Name: addFormData.system_Name,
      device_type: addFormData.device_type,
      hdd_capacity: addFormData.hdd_capacity
    };
    const newDataLists = [...list, newDataList];

    setList(newDataLists);
  };
  return (
    <div className={classes.form}>
    <form
      autoComplete="off"
      onSubmit={handleAddFormSubmit}
      className={classes.component}
    >
      <div className={classes.display}>
        <h2>System Name</h2>
        <TextField
          className={classes.field}
          name="system_name"
          variant="outlined"
          required
          onChange={handleChangeForm}
        />
      </div>
      <div className={classes.display}>
        <h2>Device Type</h2>
        <TextField
          className={classes.field}
          name="device_type"
          variant="outlined"
          required
          onChange={handleChangeForm}
        />
      </div>
      <div className={classes.display}>
        <h2>HDD Capacity</h2>
        <TextField
          className={classes.field}
          name="hdd_capacity"
          variant="outlined"
          required
          onChange={handleChangeForm}
        />
      </div>
      <div>
        <Button type="submit" variant="contained" className={classes.button}>
          Submit
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/"
          className={classes.button}
        >
          Return
        </Button>
      </div>
      </form>
      </div>
  );
};

export default AddDevices;
