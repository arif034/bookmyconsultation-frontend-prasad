import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(5),
  },
}));

const DoctorList = ({ baseUrl }) => {
  const classes = useStyles();

  const [speciality, setSpeciality] = useState("");
  const [specialityList, setSpecialityList] = useState([]);
  const [doctorsList, setDoctorList] = useState([]);

  const getSpeciality = async () => {
    const url = baseUrl + "doctors/speciality";
    console.log(url);

    try {
      const rawResponse = await fetch(url);

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        // console.log(response);
        await setSpecialityList(response);
        // console.log(specialityList);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const getDoctorsList = async () => {
    const url = baseUrl + "doctors";
    console.log(url);

    try {
      const rawResponse = await fetch(url);

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        // console.log(response);

        setDoctorList(response);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const getFilteredDoctors = async (query) => {
    console.log(query);
    const url = baseUrl + "doctors?speciality=" + encodeURI(query);
    console.log(url);

    try {
      const rawResponse = await fetch(url);

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        setDoctorList(response);
        console.log(doctorsList);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const changeSpecialityHandler = (event) => {
    setSpeciality(event.target.value);
    console.log(speciality);
    getFilteredDoctors(event.target.value);
  };

  useEffect(() => {
    getSpeciality();
    getDoctorsList();
    // console.log(specialityList);
  }, []);

  return (
    <div>
      <FormControl variant="filled" className={classes.formControl}>
        <InputLabel htmlFor="speciality">Select Speciality </InputLabel>
        {/* <InputLabel shrink id="speciality">
          <Typography variant="div">Select Speciality</Typography>
        </InputLabel> */}
        <Select
          labelId="speciality"
          id="speciality"
          value={speciality}
          onChange={changeSpecialityHandler}
          className={classes.selectEmpty}
        >
          {specialityList.map((item) => (
            <MenuItem key={"spec" + item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {doctorsList.map((doctor) => {
        return (
          <Paper
            //   style={{ width: "40%" }}
            key={doctor.id}
            variant="outlined"
            elevation={3}
          >
            <Typography variant="h5" component="h2">
              Doctor Name : {doctor.firstName}
            </Typography>
            <Typography component="h3">
              Speciality : {doctor.speciality}
            </Typography>
            <Typography component="h3">
              Rating :
              <Rating name="read-only" value={doctor.rating} readOnly />
            </Typography>
            <Button
              style={{ width: "40%", margin: "10px" }}
              variant="contained"
              color="primary"
              // onClick={this.bookAppointmentHandler(doctor)}
            >
              Book Appointment
            </Button>
            <Button
              style={{
                width: "40%",
                margin: "10px",
                backgroundColor: "green",
              }}
              variant="contained"
              color="secondary"
              onClick={() => console.log(doctor)}
            >
              View Details
            </Button>
          </Paper>
        );
      })}
    </div>
  );
};

export default DoctorList;
