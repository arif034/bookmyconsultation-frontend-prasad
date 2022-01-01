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

  const bookAppointmentHandler = () => {
    alert("Book Appointment Handler called");
  };

  useEffect(() => {
    getAvailableSlots();
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
