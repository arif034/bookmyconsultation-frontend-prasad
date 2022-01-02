import React, { useState, useEffect } from "react";
import RateAppointment from "../appointment/RateAppointment";
import { Paper, Typography, Button } from "@material-ui/core";
import Modal from "react-modal";

Modal.setAppElement(document.getElementById("root"));

const customStyles = {
  content: {
    width: "50%",
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
  // eslint-disable-next-line
  const [appointment, setAppointment] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState("");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);
  return (
    <div>
      {!isLogin ? (
        <Typography variant="h6" component="h5" className="noLoginText">
          Login to see appointments
        </Typography>
      ) : (
        <div>
          {userAppointments.map((appointment) => (
            <Paper
              className="appointmentContainer"
              variant="elevation"
              elevation={3}
              key={appointment.appointmentId}
            >
              <Typography
                variant="h6"
                className="hasTextBlack"
                component="h5"
                gutterBottom
              >
                Dr. {appointment.doctorName}
              </Typography>
              <Typography variant="body1" className="hasTextBlack">
                Date: {appointment.appointmentDate}
              </Typography>
              <Typography variant="body1" className="hasTextBlack">
                Symptoms: {appointment.symptoms}
              </Typography>
              <Typography variant="body1" className="hasTextBlack">
                priorMedicalHistory: {appointment.priorMedicalHistory}
              </Typography>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                // size="small"
                onClick={() => {
                  setSelectedAppointment(appointment);
                  toggleModalHandler();
                }}
              >
                Rate Appointment
              </Button>
            </Paper>
          ))}
          <Modal
            ariaHideApp={false}
            isOpen={isModalOpen}
            onRequestClose={toggleModalHandler}
            style={customStyles}
          >
            <RateAppointment
              baseUrl={baseUrl}
              appointment={selectedAppointment}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Appointment;
