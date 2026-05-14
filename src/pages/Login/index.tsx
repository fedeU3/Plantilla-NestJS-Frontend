import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '../../lib/hooks/contextHooks/useAuthContext';
import { LogInFormType } from '../../lib/types/forms/LoginForm';

const Login: React.FC = () => {
  const { login } = useAuthContext();
  const { handleSubmit, register } = useForm<LogInFormType>({
    defaultValues: { userID: '', password: '' },
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: '2rem',
        background: (theme) =>
          `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
      }}
    >
      <Card sx={{ width: '25rem' }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
            Ingresar
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(login)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}
          >
            <TextField
              label="Email / Usuario"
              variant="outlined"
              fullWidth
              {...register('userID', { required: true })}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              type="password"
              fullWidth
              {...register('password', { required: true })}
            />
            <Button variant="contained" type="submit" fullWidth size="large">
              Ingresar
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;