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
  const [invalidEmailClass, setInvalidEmailClass] = useState("none");
  const [emailRequiredError, setEmailRequiredError] = useState(false);

  const [password, setPassword] = useState("");
  const [
    registrationPasswordRequiredClass,
    setRegistrationPasswordRequiredClass,
  ] = useState("none");

  const [mobile, setMobile] = useState("");
  const [invalidMobileClass, setInvalidMobileClass] = useState("none");

  const [isRegistered, setIsRegistered] = useState(false);

  const changeFirstNameHandler = (e) => {
    setFirstName(e.target.value);
  };
  const changeLastNameHandler = (e) => {
    setLastName(e.target.value);
  };
  const changeEmailHandler = (e) => {
    setEmail(e.target.value);
    setInvalidEmailClass("none");
  };

  const changeRegistrationPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const changeMobileHandler = (e) => {
    setMobile(e.target.value);
    setInvalidMobileClass("none");
  };

  const registerHandler = async (e) => {
    if (e) e.preventDefault();
    // console.log("Register handler called");

    // Validation
    const emailPattern =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;

    const mobilePattern = /^[6-9]\d{9}$/i;

    email === "" ? setEmailRequiredError(true) : setEmailRequiredError(false);

    if (!email.match(emailPattern)) {
      setInvalidEmailClass("block");
      return;
    } else {
      setInvalidEmailClass("none");
    }

    if (!mobile.match(mobilePattern)) {
      setInvalidMobileClass("block");
      return;
    } else {
      setInvalidMobileClass("none");
    }

    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      mobile === ""
    ) {
      return;
    }
    let data = {
      emailId: email,
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      password: password,
    };
    console.log(data);

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
        }, 2000);
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={registerHandler} autoComplete="off" noValidate>
        <FormControl required>
          <InputLabel htmlFor="firstname">First Name</InputLabel>
          <Input
            type="text"
            id="firstname"
            onChange={changeFirstNameHandler}
            value={firstName}
          />
          <FormHelperText className={firstNameRequiredClass}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br />
        <br />

        <FormControl required>
          <InputLabel htmlFor="lastname">Last Name</InputLabel>
          <Input
            type="text"
            id="lastname"
            onChange={changeLastNameHandler}
            value={lastName}
          />
          <FormHelperText className={lastNameRequiredClass}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br />
        <br />

        <FormControl required>
          <InputLabel htmlFor="email">Email Id</InputLabel>
          <Input
            id="email"
            type="email"
            onChange={changeEmailHandler}
            value={email}
          />
          {email.length >= 1 && invalidEmailClass === "block" && (
            <FormHelperText className={invalidEmailClass}>
              <span className="red">Enter valid Email</span>
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />

        <FormControl required>
          <InputLabel htmlFor="registrationPassword">Password</InputLabel>
          <Input
            type="password"
            id="registrationPassword"
            onChange={changeRegistrationPasswordHandler}
            value={password}
          />
          <FormHelperText className={registrationPasswordRequiredClass}>
            <span className="red">required</span>
          </FormHelperText>
        </FormControl>
        <br />
        <br />

        <FormControl required>
          <InputLabel htmlFor="mobile">Mobile No.</InputLabel>
          <Input id="mobile" onChange={changeMobileHandler} value={mobile} />
          {mobile.length >= 1 && invalidMobileClass === "block" && (
            <FormHelperText className={invalidMobileClass}>
              <span className="red">Enter valid mobile number</span>
            </FormHelperText>
          )}
        </FormControl>
        <br />
        <br />
        {isRegistered === true && (
          <FormControl>
            <span>Registration Successful.</span>
          </FormControl>
        )}
        <br />
        <Button variant="contained" color="primary" type="submit">
          REGISTER
        </Button>
      </form>
    </div>
  );
};

export default Register;
