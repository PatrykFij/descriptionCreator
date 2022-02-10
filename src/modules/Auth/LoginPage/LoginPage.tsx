import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '@material-ui/core';
import { AuthContext } from 'context/AuthProvider/AuthProvider';
import { useToggle } from 'hooks/useToggle';
import Dialog from 'components/Dialog';
import TextInput from 'components/Inputs/TextInput';
import { handleException } from 'utils/handleException';
import * as URL from '../../../routes/url';
import { useAuth } from './api';
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

  const [loginFormOpen, openLoginForm, closeLoginForm] = useToggle();
  const { authenticate } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      openLoginForm();
    }
  }, [isAuthenticated, openLoginForm]);

  const onSubmit = handleSubmit(async () => {
    const { login, password } = getValues();

    try {
      const { data } = await authenticate(login, password);
      toast.success('Pomyślnie zalogowano');
      setIsAuthenticated(true);
      sessionStorage.setItem(
        'state',
        JSON.stringify({
          user: {
            authenticated: true,
            accessToken: data.accessToken,
          },
        }),
      );
      history.push(URL.ROOT);
    } catch (e: any) {
      handleException(e);
    }
  });

  return (
    <>
      {isAuthenticated ? (
        <Redirect to={URL.LOGIN} />
      ) : (
        <Dialog
          maxWidth="sm"
          title="Zaloguj"
          open={loginFormOpen}
          onClose={closeLoginForm}
          dialogActions={
            <>
              <Button onClick={onSubmit}>Save</Button>
            </>
          }
        >
          <TextInput
            name="login"
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
