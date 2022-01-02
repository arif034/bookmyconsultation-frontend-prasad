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
import Modal from "react-modal";
import DoctorDetails from "./DoctorDetails";
import BookAppointment from "./BookAppointment";

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0px",
  },
};

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
  const [doctor, setDoctor] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);

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

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getSpeciality();
    getDoctorsList();
    // console.log(specialityList);
    // eslint-disable-next-line
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
              onClick={() => {
                setDoctor(doctor);
                setModalType("bookings");
                setIsModalOpen(true);
              }}
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
              onClick={() => {
                setDoctor(doctor);
                setModalType("details");
                setIsModalOpen(true);
              }}
            >
              View Details
            </Button>
          </Paper>
        );
      })}
      <Modal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeModalHandler}
        style={customStyles}
      >
        {modalType === "details" && <DoctorDetails doctor={doctor} />}
        {modalType === "bookings" && (
          <BookAppointment baseUrl={baseUrl} doctor={doctor} />
        )}
      </Modal>
    </div>
  );
};

export default DoctorList;
