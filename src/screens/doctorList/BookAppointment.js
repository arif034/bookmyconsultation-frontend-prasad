import React, { useState, useEffect } from "react";
import {
  Paper,
  CardHeader,
  CardContent,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const BookAppointment = ({ baseUrl, doctor }) => {
  let doctorName = `${doctor.firstName} ${doctor.lastName}`;
  const dateFormatter = (date) => {
    return date.toISOString().split("T")[0];
  };

  const [selectedDate, setSelectedDate] = useState(dateFormatter(new Date()));
  const [selectedSlot, setSelectedSlot] = useState("");
  const [availableSlots, setAvailableSlots] = useState(["None"]);
  const [medicalHistory, setMedicationHistory] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [slotRequiredClass, setSlotRequiredClass] = useState("none");

  const handleDateChange = (date) => {
    setSelectedDate(dateFormatter(date));
  };

  const handleSlotChange = (e) => {
    setSelectedSlot(e.target.value);
  };

  const getAvailableSlots = async () => {
    const url = `${baseUrl}doctors/${doctor.id}/timeSlots?date=${selectedDate}`;
    console.log(url);

    try {
      const rawResponse = await fetch(url);

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        // console.log(response);
        setAvailableSlots(response.timeSlot);
        // console.log(setAvailableSlots);
      } else {
        const error = new Error();
        error.message = "Some Error Occurred";
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  const bookAppointmentHandler = async () => {
    if (
      selectedSlot === "None" ||
      selectedSlot === null ||
      selectedSlot === ""
    ) {
      setSlotRequiredClass("block");
      return;
    }
    console.log("Book Appointment Handler called");
    const emailId = JSON.parse(sessionStorage.getItem("userId"));
    const userDetails = JSON.parse(sessionStorage.getItem("user-details"));
    const accessToken = sessionStorage.getItem("accessToken");
    // console.log(JSON.parse(emailId));
    console.log(accessToken);

    let data = {
      doctorId: doctor.id,
      doctorName: doctorName,
      userId: emailId,
      userName: `${userDetails.firstName} ${userDetails.lastName}`,
      timeSlot: selectedSlot,
      createdDate: dateFormatter(new Date()),
      appointmentDate: selectedDate,
      symptoms: symptoms,
      priorMedicalHistory: medicalHistory,
    };
    console.log(data);
    const url = baseUrl + "appointments";
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
        console.log("Appointment booked successfully");
      }
      if (rawResponse.status === 400) {
        alert("Either the slot is already booked or not available");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAvailableSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  return (
    <div>
      <Paper>
        <CardHeader className="cardHeader" title="Book an Appointment" />
        <CardContent key={doctor.id}>
          <div>
            <TextField
              disabled
              id="standard-disabled"
              label="DoctorName"
              required
              defaultValue={doctorName}
            />
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <FormControl>
              <InputLabel id="timeSlot">Time Slot</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectedSlot}
                onChange={handleSlotChange}
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                {availableSlots.map((slot) => (
                  <MenuItem key={"id" + slot} value={slot}>
                    {slot}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className={slotRequiredClass}>
                <span className="red">Select a time slot</span>
              </FormHelperText>
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl>
              <TextField
                id="standard-multiline-static"
                label="Medical History"
                multiline
                rows={4}
                defaultValue=""
                onChange={(e) => setMedicationHistory(e.target.value)}
              />
            </FormControl>
          </div>
          <br />
          <div>
            <FormControl>
              <TextField
                id="standard-multiline-static"
                label="Symptoms"
                multiline
                rows={4}
                defaultValue=""
                placeholder="ex.Cold, Swelling, etc"
                onChange={(e) => setSymptoms(e.target.value)}
              />
            </FormControl>
          </div>
          <Button
            id="bookappointment"
            variant="contained"
            color="primary"
            onClick={bookAppointmentHandler}
          >
            Book Appointment
          </Button>
        </CardContent>
      </Paper>
    </div>
  );
};

export default BookAppointment;
