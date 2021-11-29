import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { AuthContext } from 'context/AuthProvider/AuthProvider';
import { useToggle } from 'hooks/useToggle';
import Dialog from 'components/Dialog';
import TextInput from 'components/Inputs/TextInput';
import { handleException } from 'utils/handleException';
import * as URL from '../../../routes/url';
import * as T from './types';

const LoginPage = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  let history = useHistory();

  const form = useForm<T.LoginFields>({
    mode: 'onSubmit',
  });
  const {
    getValues,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const onSubmit = handleSubmit(async () => {
    const { username, password } = getValues();
    try {
      const response = await axios.post(
        '/.netlify/functions/node-fetch?url=auth',
        {},
        {
          auth: {
            username: username,
            password: password,
          },
          headers: { accept: 'Accept: application/json' },
        },
      );
      toast.success('Pomyślnie zalogowano');
      setIsAuthenticated(true);
      sessionStorage.setItem(
        'state',
        JSON.stringify({
          user: {
            authenticated: true,
            accessToken: response.data.data.access_token,
          },
        }),
      );
      history.push(URL.ROOT);
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
          <TextInput
            name="username"
            label="Login"
            control={control}
            errors={errors}
            required
          />
          <TextInput
            name="password"
            label="Password"
            control={control}
            errors={errors}
            required
            type="password"
          />
        </Dialog>
      )}
    </>
  );
};

export default LoginPage;
