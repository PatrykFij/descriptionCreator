import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@material-ui/core";
import axios from "axios";
import { useToggle } from "hooks/useToggle";
import Dialog from "components/Dialog";
import TextInput from "components/Inputs/TextInput";
import * as T from "./types";

const LoginPage = () => {
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
      const { data } = await axios.post("https://brillar-sklep.pl/webapi/rest/auth", {
        auth: {
          username: username,
          password: password,
        },
        headers: { "Access-Control-Allow-Origin": "*" },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
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
