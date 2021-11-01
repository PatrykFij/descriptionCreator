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

const LoginPage = () => {
  const { setIsAuth } = useContext(AuthContext);
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
      setIsAuth(true);
    } catch (e) {
      toast.error(e.response.statusText);
      handleException(e);
    }
  });

  const [bondholderMeetingsFormOpen, openBondholderMeetingsForm, closeBondholderMeetingsForm] = useToggle();

  return (
    <Dialog
      maxWidth="sm"
      title="Zaloguj"
      onClose={closeBondholderMeetingsForm}
      dialogActions={
        <>
          <Button onClick={onSubmit}>Save</Button>
        </>
      }
    >
      <TextInput name="username" label="Login" control={control} errors={errors} required />
      <TextInput name="password" label="Password" control={control} errors={errors} required />
    </Dialog>
  );
};

export default LoginPage;
