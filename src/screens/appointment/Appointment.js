import React from "react";

const Appointment = ({ isLogin }) => {
  return (
    <div>{isLogin === true ? "Appointments" : "Login to see Appointments"}</div>
  );
};

export default Appointment;
