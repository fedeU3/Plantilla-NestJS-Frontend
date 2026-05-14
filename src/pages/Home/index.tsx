import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useMembers } from '../../lib/hooks/useMembers';
import { useEquipos } from '../../lib/hooks/useEquipos';

type Equipo = {
  id: string | number;
  nombre?: string;
  marca?: string;
};

function normalizeEquipos(input: unknown): Equipo[] {
  if (Array.isArray(input)) return input as Equipo[];
  if (input && typeof input === 'object') {
    const obj = input as Record<string, unknown>;
    if (Array.isArray(obj.data)) return obj.data as Equipo[];
    if (Array.isArray(obj.items)) return obj.items as Equipo[];
  }
  return [];
}

export default function Home() {
  const { isLoading: memLoading, error: memError } = useMembers();
  const { equipos, isLoading: eqLoading, error: eqError } = useEquipos();

  const equiposArr = normalizeEquipos(equipos);

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero */}
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          background: (theme) =>
            `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
        }}
      >
        <Typography variant="h3" fontWeight={700}>
          Plantilla
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
          Descripción del proyecto va aquí
        </Typography>
      </Box>

      <Container sx={{ py: 4 }}>
        {eqLoading && <Typography color="text.secondary">Cargando...</Typography>}
        {eqError && <Typography color="error">Error al cargar los equipos.</Typography>}
        {!eqLoading && !eqError && equiposArr.length === 0 && (
          <Typography color="text.secondary">No se encontraron equipos.</Typography>
        )}
        {equiposArr.length > 0 && (
          <Grid container spacing={2}>
            {equiposArr.map((equipo) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={String(equipo.id)}>
                <Card>
                  {/* Placeholder imagen — reemplazar con <CardMedia> cuando haya asset real */}
                  <Box
                    sx={{
                      height: 140,
                      bgcolor: 'background.default',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <InventoryIcon sx={{ fontSize: 48, color: 'text.secondary' }} />
                  </Box>
                  <CardContent>
                    <Typography variant="h6">{equipo.nombre ?? 'Sin nombre'}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {equipo.marca ?? '—'}
                    </Typography>
                    <Button variant="contained" fullWidth sx={{ mt: 1 }} startIcon={<InventoryIcon />}>
                      Alquilar
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {memLoading && (
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            Cargando miembros...
          </Typography>
        )}
        {memError && (
          <Typography color="error" sx={{ mt: 2 }}>
            Error al cargar los miembros.
          </Typography>
        )}
      </Container>
    </Box>
  );
}