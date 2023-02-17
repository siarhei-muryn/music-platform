import React, { useState } from "react";
import { GoogleSignIn } from "../google/google.sign.in";
import { SignInForm } from "./sign.in.form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useActions } from "../../hooks/useActions";
import "./sign.in.css";

export const SignIn: React.FC = () => {
  const [signInError, setSignInError] = useState("");
  const { fetchUser, setToken, setAuth } = useActions();

  const onSubmit = (dataValues: any) => {
    signIn(dataValues).then();
  };

  const signIn = async (dataValues: any) => {
    await axios
      .post("http://localhost:5000/auth/sign-in", {
        ...dataValues,
      })
      .then((response) => {
        /*fetchUser(response.data.id);
        setToken(response.data.token);
        setAuth(true);*/

        localStorage.setItem("id", response.data.id);
        localStorage.setItem("token", response.data.token);
        window.location.replace("../");
      })
      .catch((error) => {
        setSignInError(error.response.data.message);
      });
  };
  return (
    <div className={"sign-in"}>
      <div className={"sign-in-container"}>
        <h1>Sign In</h1>

        <SignInForm submit={onSubmit} error={signInError} />
        <Link to={"/sign-up"} replace={true}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};
