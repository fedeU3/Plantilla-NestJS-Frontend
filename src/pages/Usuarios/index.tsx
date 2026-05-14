import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import { useAuthContext } from '../../lib/hooks/contextHooks/useAuthContext';

const Usuario: React.FC = () => {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <Typography variant="h6" color="text.secondary">
          Cargando perfil...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card>
          <CardContent sx={{ p: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    bgcolor: 'primary.main',
                    fontSize: '1.75rem',
                    color: 'primary.contrastText',
                  }}
                >
                  {user.nombre?.[0]?.toUpperCase() ?? <PersonIcon />}
                </Avatar>
              </Grid>
              <Grid size="grow">
                <Typography variant="h4" fontWeight={700}>
                  {user.nombre} {user.apellido}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
                  @{user.userID}
                </Typography>
                <Box display="flex" gap={1} mt={1} flexWrap="wrap">
                  {user.esAdmin && (
                    <Chip
                      icon={<AdminPanelSettingsIcon />}
                      label="Administrador"
                      color="primary"
                      size="small"
                    />
                  )}
                  <Chip
                    icon={user.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                    label={user.isActive ? 'Activo' : 'Inactivo'}
                    color={user.isActive ? 'success' : 'default'}
                    size="small"
                  />
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="overline" color="text.secondary" display="block">
                  Dirección
                </Typography>
                <Typography variant="body1">{user.direccion || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="overline" color="text.secondary" display="block">
                  Rol
                </Typography>
                <Typography variant="body1">{user.rol || '—'}</Typography>
              </Grid>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="overline" color="text.secondary" display="block">
                  ID de usuario
                </Typography>
                <Typography variant="body1">#{user.id}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Usuario;