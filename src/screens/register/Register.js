import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Button,
} from "@material-ui/core";

const Register = ({ baseUrl, loginUser }) => {
  const [firstName, setFirstName] = useState("");
  const [firstNameRequiredClass, setFirstNameRequiredClass] = useState("none");
  const [lastName, setLastName] = useState("");
  const [lastNameRequiredClass, setLastNameRequiredClass] = useState("none");

  const [email, setEmail] = useState("");
  const [emailRequiredClass, setEmailRequiredClass] = useState("none");

  const [password, setPassword] = useState("");
  const [
    registrationPasswordRequiredClass,
    setRegistrationPasswordRequiredClass,
  ] = useState("none");

  const [contact, setContact] = useState("");
  const [contactRequiredClass, setContactRequiredClass] = useState("none");

  const [isRegistered, setIsRegistered] = useState(false);

  const changeFirstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const changeLastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
  };

  const changeRegistrationPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const changeContactHandler = (e) => {
    setContact(e.target.value);
  };

  const registerHandler = async () => {
    // console.log("Register handler called");

    // Validation
    firstName === ""
      ? setFirstNameRequiredClass("block")
      : setFirstNameRequiredClass("none");
    lastName === ""
      ? setLastNameRequiredClass("block")
      : setLastNameRequiredClass("none");
    email === ""
      ? setEmailRequiredClass("block")
      : setEmailRequiredClass("none");
    password === ""
      ? setRegistrationPasswordRequiredClass("block")
      : setRegistrationPasswordRequiredClass("none");
    contact === ""
      ? setContactRequiredClass("block")
      : setContactRequiredClass("none");

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      contact === ""
    ) {
      return;
    }
    let data = {
      emailId: email,
      firstName: firstName,
      lastName: lastName,
      mobile: contact,
      password: password,
    };
    // console.log(data);

    const url = baseUrl + "users/register";
    try {
      // debugger;
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify(data),
      });

      if (rawResponse.ok) {
        // const response = await rawResponse.json();
        // console.log(response);
        setIsRegistered(true);

        setTimeout(function () {
          loginUser(email, password);
        }, 3000);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <>
      <FormControl required>
        <InputLabel htmlFor="firstname">First Name</InputLabel>
        <Input type="text" id="firstname" onChange={changeFirstNameHandler} />
        <FormHelperText className={firstNameRequiredClass}>
          <span className="red">required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      <FormControl required>
        <InputLabel htmlFor="lastname">Last Name</InputLabel>
        <Input type="text" id="lastname" onChange={changeLastNameHandler} />
        <FormHelperText className={lastNameRequiredClass}>
          <span className="red">required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      <FormControl required>
        <InputLabel htmlFor="email">Email Id</InputLabel>
        <Input id="email" type="email" onChange={changeEmailHandler} />
        <FormHelperText className={emailRequiredClass}>
          <span className="red">required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      <FormControl required>
        <InputLabel htmlFor="registrationPassword">Password</InputLabel>
        <Input
          type="password"
          id="registrationPassword"
          onChange={changeRegistrationPasswordHandler}
        />
        <FormHelperText className={registrationPasswordRequiredClass}>
          <span className="red">required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <br />

      <FormControl required>
        <InputLabel htmlFor="contact">Mobile No.</InputLabel>
        <Input id="contact" onChange={changeContactHandler} />
        <FormHelperText className={contactRequiredClass}>
          <span className="red">required</span>
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      {isRegistered === true && (
        <FormControl>
          <span>Registration Successful.</span>
        </FormControl>
      )}
      <br />
      <Button variant="contained" color="primary" onClick={registerHandler}>
        REGISTER
      </Button>
    </>
  );
};

export default Register;
