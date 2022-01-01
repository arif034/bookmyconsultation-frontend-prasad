import React, { useState, useEffect } from "react";
import RateAppointment from "../appointment/RateAppointment";
import { Paper, Typography, Button } from "@material-ui/core";
import Modal from "react-modal";

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

const Appointment = ({ isLogin, baseUrl }) => {
  const [userAppointments, setUserAppointments] = useState([]);
  const emailId = JSON.parse(sessionStorage.getItem("userId"));
  const [appointment, setAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getUserAppointments = async () => {
    const url = `${baseUrl}users/${emailId}/appointments`;
    const accessToken = sessionStorage.getItem("accessToken");
    // console.log(url, accessToken);

    try {
      // debugger;
      const rawResponse = await fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json;Charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        // console.log(response);
        setUserAppointments(response);
        // console.log(setAvailableSlots);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const toggleModalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (isLogin === true) {
      getUserAppointments();
    }
  }, [isLogin]);
  return (
    <div>
      {!isLogin === true ? (
        "Login to see Appointments"
      ) : (
        <div>
          {userAppointments.map((appointment) => (
            <Paper variant="outlined" key={appointment.appointmentId}>
              <Typography variant="body1">
                Dr. {appointment.doctorName}
              </Typography>
              <Typography variant="body2">
                Date: {appointment.appointmentDate}
              </Typography>
              <Typography variant="body2">
                Symptoms: {appointment.symptoms}
              </Typography>
              <Typography variant="body2">
                priorMedicalHistory: {appointment.priorMedicalHistory}
              </Typography>
              <br />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setAppointment(appointment);
                  toggleModalHandler();
                }}
              >
                Rate Appointment
              </Button>

              <Modal
                ariaHideApp={false}
                isOpen={isModalOpen}
                onRequestClose={toggleModalHandler}
                style={customStyles}
              >
                <RateAppointment baseUrl={baseUrl} appointment={appointment} />
              </Modal>
            </Paper>
          ))}
        </div>
      )}
    </div>
  );
};

export default Appointment;
