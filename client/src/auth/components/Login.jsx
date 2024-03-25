import React, { useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

import { serializeFormData } from 'util/forms';
import { useLogin } from 'auth/hooks/useLogin';
import { useRegister } from 'auth/hooks/useRegister';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
});

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '300px',
});

function View({ handleLogin, handleRegister, formRef }) {
  return (
    <Container>
      <StyledForm ref={formRef}>
        <TextField
          label="Username"
          variant="outlined"
          name="username"
          autoComplete="username"
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          autoComplete="password"
        />
        <Button onClick={handleLogin} variant="contained" color="primary">
          Login
        </Button>
        <Button onClick={handleRegister} variant="contained" color="primary">
          Register
        </Button>
      </StyledForm>
    </Container>
  );
}

function Model() {
  const formRef = useRef(null);
  const doLogin = useLogin();
  const doRegister = useRegister();

  const handleLogin = () => {
    const { username, password } = serializeFormData(formRef.current);

    doLogin.mutate({
      username,
      password,
    });
  };

  const handleRegister = () => {
    const { username, password } = serializeFormData(formRef.current);

    debugger;

    doRegister.mutate({
      username,
      password,
    });
  };

  const hookProps = {
    handleLogin,
    handleRegister,
    formRef,
  };

  return (
    <View
      {...hookProps}
    />
  );
}

export default Model;
export { View };
