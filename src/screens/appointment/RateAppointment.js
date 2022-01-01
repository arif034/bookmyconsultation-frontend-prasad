import React, { useState } from "react";
import {
  Paper,
  CardHeader,
  CardContent,
  TextField,
  FormControl,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const RateAppointment = ({ appointment, baseUrl }) => {
  const [comments, setComments] = useState("");
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingRequiredClass, setRatingRequiredClass] = useState("none");

  const submitRatingHandler = async () => {
    ratingValue === 0
      ? setRatingRequiredClass("block")
      : setRatingRequiredClass("none");

    const url = baseUrl + "ratings";
    console.log(url);
  };
  return (
    <Paper>
      <CardHeader className="cardHeader" title="Rate an Appointment" />
      <CardContent key={appointment.appointmentId}>
        <div>
          <FormControl>
            <TextField
              id="standard-multiline-static"
              label="Comments"
              multiline
              rows={4}
              defaultValue=""
              onChange={(e) => setComments(e.target.value)}
            />
          </FormControl>
        </div>
        <br />
        <div>
          <FormControl>
            <Rating
              name="simple-controlled"
              value={ratingValue}
              onChange={(event, newValue) => {
                setRatingValue(newValue);
              }}
            />
            <FormHelperText className={ratingRequiredClass}>
              <span className="red">Submit a rating</span>
            </FormHelperText>
          </FormControl>
        </div>
        <br />
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={submitRatingHandler}
          >
            Rate Appointment
          </Button>
        </div>
      </CardContent>
    </Paper>
  );
};

export default RateAppointment;
