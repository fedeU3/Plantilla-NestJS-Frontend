import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Delete as DeleteIcon } from "@mui/icons-material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAuthContext } from "../../lib/hooks/contextHooks/useAuthContext";
import FormularioEquipo from "../../layouts/components/FormularioEquipo";
interface IUser {
  id: number;
  avatar: string;
  name: string;
  position: string;
  adress: string;
  bio: string;
  phone: string;
  email: string;
  equipment: string[];
}

const fetchCurrentUser = async (): Promise<IUser> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch('/api/usuarioActual')
      .then(response => response.json())
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        console.error('Error al obtener el usuario:', error);
      resolve({
        id: 1,
        avatar: "PlaceholderProfile.jpg",
        name: "Usuario Ejemplo",
        position: "Puesto de ejemplo",
        adress: "Direccion de ejemplo",
        bio: "Esta es una biografía de ejemplo.",
        phone: "123-456-7890",
        email: "usuario@example.com",
        equipment: ["Cámara", "Micrófono", "Trípode"],
      });
      });
    }, 1000);
  });
};

const updateUser = async (user: IUser): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Usuario actualizado", user);
      resolve();
    }, 500);
  });
};

const Usuario = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<IUser | null>(null);
  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchCurrentUser();
        setUser(data);
        setFormData(data);
      } catch (err) {
        setError("Error al cargar la información del usuario");
      }
    };
    loadUser();
  }, []);

  const handleDeleteEquipment = (index: number) => {
    if (user) {
      const updatedEquipment = [...user.equipment];
      updatedEquipment.splice(index, 1);
      setUser({ ...user, equipment: updatedEquipment });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    if (formData) {
      try {
        await updateUser(formData);
        setUser(formData);
        setEditing(false);
      } catch (err) {
        setError("Error al actualizar la información");
      }
    }
  };

  if (error) return <p>{error}</p>;
  if (!user) return <p>Cargando...</p>;

  /*const AuthContext = useAuthContext();*/

 /* AuthContext.user?;*/

  return (
    <Box sx={{minHeight: "100vh", color: "#B0BEC5"}}>
      {/* Sección de Perfil */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%", backgroundColor: "#151E26", p: 2 }}>
        <Typography variant="h5" mb={2}>Mi perfil</Typography>
        <IconButton color="inherit">
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Container sx={{ py: 2 }}>
        <Card sx={{ backgroundColor: "#151E26", p: 2, borderRadius: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <CardMedia
                component="img"
                image={user.avatar}
                alt={user.name}
                sx={{ width: 100, height: 100, borderRadius: "50%" }}
              />
            </Grid>
            <Grid item>
              {editing ? (
                <TextField
                  fullWidth
                  label="Nombre"
                  name="name"
                  value={formData?.name || ''}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="h4" fontWeight="bold">{user.name}</Typography>
              )}
              {editing ? (
                <TextField
                  fullWidth
                  label="Puesto o profesion"
                  name="position"
                  value={formData?.position || ''}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="h5" fontWeight="bold">{user.position}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              {editing ? (
                <TextField
                  fullWidth
                  label="Biografía"
                  name="bio"
                  value={formData?.bio || ''}
                  onChange={handleChange}
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="body1">{user.bio}</Typography>
              )}
              {editing ? (
                <TextField
                  fullWidth
                  label="Direcion"
                  name="adress"
                  value={formData?.adress || ''}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="body2" sx={{ mt: 2 }}>
                  <strong>Direccion:</strong> {user.adress}
                </Typography>
              )}
              {editing ? (
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="phone"
                  value={formData?.phone || ''}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="body2">
                  <strong>Teléfono:</strong> {user.phone}
                </Typography>
              )}
              {editing ? (
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData?.email || ''}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
              ) : (
                <Typography variant="body2">
                  <strong>Email:</strong> {user.email}
                </Typography>
              )}
            </Grid>
            <Grid item>
              {editing ? (
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSubmit}
                  sx={{ backgroundColor: "#FF7043" }}
                >
                  Guardar
                </Button>
              ) : (
                <IconButton
                  color="inherit"
                  onClick={() => setEditing(true)}
                >
                  <EditIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Card>
      </Container>
      {/* Sección de Equipos */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ width: "100%", backgroundColor: "#151E26", p: 2, mb: 2  }}>
        <Typography variant="h5" mb={2}>Mi Equipo</Typography>
        <IconButton color="inherit">
          <ArrowForwardIcon />
        </IconButton>
      </Box>
      <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#FF7043" }}
              onClick={() => setShowForm(true)}
            >
              Agregar Equipo
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#D32F2F" }}
              onClick={() => handleDeleteEquipment(user.equipment.length - 1)}
              disabled={user.equipment.length === 0}
            >
              Eliminar Último Equipo
            </Button>
          </Grid>
        </Grid>

        {showForm && (
          <Grid item xs={12} sx={{ mb: 2 }}>
            <FormularioEquipo onClose={() => setShowForm(false)} onAdd={function (): void {
            throw new Error("Function not implemented.");
          } } />
          </Grid>
        )}

        <Grid container spacing={2}>
          {user.equipment.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ backgroundColor: "#2C3E50", position: "relative" }}>
                <CardMedia component="img" height="140" src="PlaceholderEquipo.jpg" alt="Equipo" />
                <CardContent>
                  <Typography variant="h6">{item}</Typography>
                  <Typography variant="subtitle1">Marca: placeholder</Typography>
                  <IconButton
                    sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
                    onClick={() => handleDeleteEquipment(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
    </Box>
  );
};

export default Usuario;