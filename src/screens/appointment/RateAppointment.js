import React, { useState } from "react";
import {
  Paper,
  CardHeader,
  CardContent,
  TextField,
  FormControl,
  Button,
  FormHelperText,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

const RateAppointment = ({ appointment, baseUrl }) => {
  const [comments, setComments] = useState("");
  const [rating, setRating] = useState(0);
  const [ratingRequiredClass, setRatingRequiredClass] = useState("none");

  const submitRatingHandler = async () => {
    rating === 0
      ? setRatingRequiredClass("block")
      : setRatingRequiredClass("none");
    const accessToken = sessionStorage.getItem("accessToken");

    let data = {
      appointmentId: appointment.appointmentId,
      doctorId: appointment.doctorId,
      rating: rating,
      comments: comments,
    };
    const url = baseUrl + "ratings";
    // console.log(url, data, accessToken);

    try {
      //   debugger;
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
      });

      if (rawResponse.ok) {
        console.log("Rating Submitted successfully");
      }
      if (rawResponse.status === 400) {
        console.log("Bad Post Request");
      }
    } catch (e) {
      console.log(e);
    }
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
            <div>
              <Typography
                variant="body1"
                component="span"
                className="hasTextBlack"
              >
                Rating:
              </Typography>

              <Rating
                name={appointment.appointmentId}
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </div>
            <FormHelperText className={ratingRequiredClass}>
              <span className="red">Select a rating</span>
            </FormHelperText>
          </FormControl>
        </div>
        <br />
        <div>
          <Button
            variant="contained"
            color="primary"
            // size="small"
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
