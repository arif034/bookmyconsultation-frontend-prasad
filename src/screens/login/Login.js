import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";

const Login = ({ baseUrl, loginUser }) => {
  const [email, setEmail] = useState("");
  const [invalidEmailClass, setInvalidEmailClass] = useState("none");
  const [emailRequiredError, setEmailRequiredError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);

  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
    setInvalidEmailClass("none");
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const loginHandler = async (e) => {
    if (e) e.preventDefault();
    // alert("Login Function Called");

    // validate data
    if (email === "") {
      setEmailRequiredError(true);
      return;
    }
    if (password === "") {
      setPasswordRequiredError(true);
      return;
    }
    const pattern =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\\.,;:\s@"]{2,})$/i;

    if (!email.match(pattern)) {
      setInvalidEmailClass("block");
      return;
    } else {
      setInvalidEmailClass("none");
    }
    loginUser(email, password);
  };

  return (
    <div>
      <form noValidate autoComplete="off" onSubmit={loginHandler}>
        <FormControl required margin="dense">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input
            id="email"
            value={email}
            type="email"
            onChange={changeEmailHandler}
            // onFocus={(e) => setEmailElement(e.currentTarget)}
          />

          {email.length >= 1 && invalidEmailClass === "block" && (
            <FormHelperText className={invalidEmailClass}>
              <span className="red">Enter valid Email</span>
            </FormHelperText>
          )}
          {emailRequiredError === true && email.length === 0 && (
            <span className="error-popup">Please fill out this field</span>
          )}
        </FormControl>
        <br />
        <FormControl required margin="dense">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={changePasswordHandler}
          />
          {passwordRequiredError === true && password.length === 0 && (
            <span className="error-popup">Please fill out this field</span>
          )}
        </FormControl>
        <br />
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit">
          LOGIN
        </Button>
      </form>
    </div>
  );
};

export default Login;
