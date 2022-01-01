import React from "react";
import { Paper, CardHeader, CardContent, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const DoctorDetails = ({ doctor }) => {
  return (
    <>
      <Paper>
        <CardHeader className="cardHeader" title="Doctor Details" />
        <CardContent key={doctor.id}>
          <Typography variant="body1">
            Dr. {doctor.firstName} {doctor.lastName}
          </Typography>
          <Typography variant="body2">
            Total Experience: {doctor.totalYearsOfExp} years
          </Typography>
          <Typography variant="body2">Date of Birth: {doctor.dob}</Typography>
          <Typography variant="body2">City: {doctor.address.city}</Typography>
          <Typography variant="body2">Email: {doctor.emailId}</Typography>
          <Typography variant="body2">Mobile: {doctor.mobile}</Typography>
          <Typography variant="body2">
            Rating: {<Rating name="read-only" value={doctor.rating} readOnly />}
          </Typography>
        </CardContent>
      </Paper>
    </>
  );
};

export default DoctorDetails;
