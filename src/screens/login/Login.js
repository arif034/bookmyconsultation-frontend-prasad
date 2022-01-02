import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";

const Login = ({ baseUrl, loginUser }) => {
  const [email, setEmail] = useState("");
  const [emailRequiredClass, setEmailRequiredClass] = useState("none");

  //   const [isEmailValid, setIsEmailValid] = useState(null);

  const [password, setPassword] = useState("");
  const [passwordRequiredClass, setPasswordRequiredClass] = useState("none");

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = async () => {
    // alert("Login Function Called");

    // validate data
    email === ""
      ? setEmailRequiredClass("block")
      : setEmailRequiredClass("none");
    password === ""
      ? setPasswordRequiredClass("block")
      : setPasswordRequiredClass("none");
    // return if blank email & password are passed
    if (email === "" || password === "") {
      return;
    }
    loginUser(email, password);
  };

  return (
    <div>
      <FormControl required margin="dense">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" type="email" onChange={changeEmailHandler} />
        <FormHelperText className={emailRequiredClass}>
          <span className="red">Please fill out this field</span>
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl required margin="dense">
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input id="password" type="text" onChange={changePasswordHandler} />
        <FormHelperText className={passwordRequiredClass}>
          <span className="red">Please fill out this field</span>
        </FormHelperText>
      </FormControl>
      <br />
      <br />
      <br />
      <Button variant="contained" color="primary" onClick={loginHandler}>
        LOGIN
      </Button>
    </div>
  );
};

export default Login;
