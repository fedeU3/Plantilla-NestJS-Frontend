import React, { useState } from 'react';
import { useMyOrders } from '../../lib/hooks/useMyOrders';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../lib/constants/routes';

const MyOrders: React.FC = () => {
  const navigate = useNavigate();
  const { myOrders, isLoading, error } = useMyOrders();
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleSort = () => setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));

  const sortedOrders = myOrders?.slice().sort((a, b) => {
    const diff =
      new Date(a.fechaHoraPedido).getTime() - new Date(b.fechaHoraPedido).getTime();
    return sortOrder === 'asc' ? diff : -diff;
  });

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ bgcolor: 'background.paper', p: 2 }}
      >
        <Typography variant="h5" fontWeight={600}>
          Mis Pedidos
        </Typography>
        <IconButton color="inherit">
          <ArrowForwardIcon />
        </IconButton>
      </Box>

      {/* Controles */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: 2, gap: 2, flexWrap: 'wrap' }}
      >
        <TextField variant="outlined" placeholder="Buscar..." size="small" sx={{ minWidth: 200 }} />
        <Box display="flex" gap={1}>
          <Button variant="contained" onClick={toggleSort} startIcon={<SortIcon />}>
            {sortOrder === 'asc' ? 'Ascendente' : 'Descendente'}
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(ROUTES.createOrders.path)}
          >
            Nuevo pedido
          </Button>
        </Box>
      </Box>

      {/* Lista */}
      <Container sx={{ py: 2 }}>
        {isLoading && <Typography color="text.secondary">Cargando...</Typography>}
        {error && <Typography color="error">Error al cargar los pedidos.</Typography>}
        {!isLoading && !error && sortedOrders && sortedOrders.length > 0 ? (
          <Grid container spacing={2}>
            {sortedOrders.map((order, index) => (
              <Grid size={12} key={index}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">Pedido #{String(order.id)}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(order.fechaHoraPedido).toLocaleString()}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" mt={2} gap={1} flexWrap="wrap">
                      <Button variant="contained" startIcon={<InfoIcon />}>
                        Más información
                      </Button>
                      <Button variant="outlined" color="error" startIcon={<CancelIcon />}>
                        Cancelar
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          !isLoading && !error && (
            <Typography color="text.secondary">No hay pedidos disponibles.</Typography>
          )
        )}
      </Container>
    </Box>
  );
};

export default MyOrders;