import React, { useState } from "react";
import Header from "../../common/header/Header";
import { Tab, Tabs } from "@material-ui/core";
import DoctorList from "../doctorList/DoctorList";
import Appointment from "../appointment/Appointment";

const Home = ({ baseUrl }) => {
  const [value, setValue] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const tabSwitchHandler = (event, value) => {
    setValue(value);
  };
  return (
    <div>
      <Header baseUrl={baseUrl} isLogin={isLogin} setIsLogin={setIsLogin} />
      <Tabs
        variant="fullWidth"
        indicatorColor="primary"
        value={value}
        onChange={tabSwitchHandler}
      >
        <Tab label="Doctors"></Tab>
        <Tab label="Appointments"></Tab>
      </Tabs>
      {value === 0 && <DoctorList baseUrl={baseUrl} />}
      {value === 1 && <Appointment baseUrl={baseUrl} isLogin={isLogin} />}
    </div>
  );
};

export default Home;
