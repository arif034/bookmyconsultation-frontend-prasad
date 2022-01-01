import React, { useState, useEffect } from "react";
import Header from "../../common/header/Header";

const Home = ({ baseUrl }) => {
  return (
    <div>
      <Header baseUrl={baseUrl} />
    </div>
  );
};

export default Home;
