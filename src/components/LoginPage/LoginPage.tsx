import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import TextInput from "components/Inputs/TextInput";
import * as T from "./types";
import Dialog from "components/Dialog";
import { Button } from "@material-ui/core";
import { useToggle } from "hooks/useToggle";

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
    const details = getValues();
    console.log(details);
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
      <TextInput name="login" label="Login" control={control} errors={errors} required />
      <TextInput name="password" label="Password" control={control} errors={errors} required />
    </Dialog>
  );
};

export default LoginPage;
