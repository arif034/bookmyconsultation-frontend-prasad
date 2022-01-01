import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
} from "@material-ui/core";

const Login = ({ baseUrl, setIsLogin, toggleModalHandler }) => {
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
    const url = baseUrl + "auth/login";
    // console.log(url);
    const params = window.btoa(email + ":" + password);

    try {
      const rawResponse = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Basic ${params}`,
        },
      });

      if (rawResponse.ok) {
        const response = await rawResponse.json();
        // console.log(response.accessToken);
        // window.location.href = "/";
        window.sessionStorage.setItem("user-details", JSON.stringify(response));
        window.sessionStorage.setItem("userId", JSON.stringify(response.id));
        window.sessionStorage.setItem("accessToken", response.accessToken);
        setIsLogin(true);
        toggleModalHandler();
        console.log("User Logged In");
      } else {
        const error = new Error();
        error.message = "Something went wrong.";
        console.log("User Could not be logged in");
        throw error;
      }
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div>
      <FormControl required>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" type="email" onChange={changeEmailHandler} />
        <FormHelperText className={emailRequiredClass}>
          <span className="red">Please fill out this field</span>
        </FormHelperText>
      </FormControl>
      <br />
      <FormControl required>
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
