import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useToggle } from "hooks/useToggle";
import { AuthContext } from "components/AuthProvider/AuthProvider";
import Dialog from "components/Dialog";
import TextInput from "components/Inputs/TextInput";
import { handleException } from "utils/handleException";
import * as T from "./types";
import { Redirect, useHistory } from "react-router-dom";
import * as URL from "../../routes/url";

const LoginPage = () => {
  const { isAuthenticated, setIsAuthenticated, setAccessToken } = useContext(AuthContext);
  let history = useHistory();

  const form = useForm<T.LoginFields>({
    mode: "onSubmit",
  });
  const {
    trigger,
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit(async () => {
    const { username, password } = getValues();
    //brillar-sklep.pl/webapi/rest/auth
    try {
      const response = await axios.post(
        "/.netlify/functions/node-fetch",
        {},
        {
          auth: {
            username: username,
            password: password,
          },
          headers: { accept: "Accept: application/json" },
        }
      );
      toast.success("Pomyślnie zalogowano");
      setIsAuthenticated(true);
      setAccessToken(response.data.data.access_toke);
      sessionStorage.setItem("access_token", response.data.data.access_token);
      history.push(URL.DESCRIPTION_CREATOR);
    } catch (e: any) {
      toast.error(e.response.statusText);
      handleException(e);
    }
  });

  const [loginFormOpen, openLoginForm, closeLoginForm] = useToggle();

  return (
    <>
      {isAuthenticated ? (
        <Redirect to={URL.LOGIN} />
      ) : (
        <Dialog
          maxWidth="sm"
          title="Zaloguj"
          onClose={closeLoginForm}
          dialogActions={
            <>
              <Button onClick={onSubmit}>Save</Button>
            </>
          }
        >
          <TextInput name="username" label="Login" control={control} errors={errors} required />
          <TextInput name="password" label="Password" control={control} errors={errors} required />
        </Dialog>
      )}
    </>
  );
};

export default LoginPage;
