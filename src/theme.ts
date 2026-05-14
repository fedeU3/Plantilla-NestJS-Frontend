import { createTheme } from '@mui/material/styles';

/**
 * Paleta centralizada — cambiar aquí afecta toda la app.
 *
 * Jerarquía de superficies (de más oscuro a más claro):
 *   body < sidebar < input < card/appBar/footer
 */
export const COLORS = {
  // Superficies
  body:       '#080808',   // fondo de página
  sidebar:    '#151E26',   // sidebar/drawer
  input:      '#1E2A38',   // campos de texto
  surface:    '#2C3E50',   // cards, appBar, footer

  // Texto
  textPrimary:   '#B0BEC5',
  textSecondary: '#78909C',

  // Marca
  primary:      '#FF7043',
  primaryDark:  '#E64A19',
  onPrimary:    '#080808',  // texto sobre botones primarios
};

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: COLORS.body,
      paper:   COLORS.surface,
    },
    text: {
      primary:   COLORS.textPrimary,
      secondary: COLORS.textSecondary,
    },
    primary: {
      main: COLORS.primary,
      dark: COLORS.primaryDark,
    },
    secondary: {
      main: COLORS.primaryDark,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.surface,
          boxShadow: 'none',
          borderBottom: `1px solid ${COLORS.input}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: COLORS.sidebar,
          borderRight: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.primary,
          color: COLORS.onPrimary,
          '&:hover': {
            backgroundColor: COLORS.primaryDark,
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          color: COLORS.textPrimary,
          borderColor: COLORS.textSecondary,
          '&:hover': {
            backgroundColor: COLORS.input,
            borderColor: COLORS.textPrimary,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.surface,
          color: COLORS.textPrimary,
          borderRadius: '1rem',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: COLORS.surface,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: COLORS.input,
            color: COLORS.textPrimary,
          },
          '& .MuiInputLabel-root': {
            color: COLORS.textSecondary,
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.input,
          },
          '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.primary,
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: COLORS.primary,
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: COLORS.primary,
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: COLORS.primary,
          '&.Mui-checked': {
            color: COLORS.primary,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          '& .MuiTableCell-root': {
            backgroundColor: COLORS.input,
            color: COLORS.textSecondary,
            fontWeight: 600,
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: COLORS.input,
        },
      },
    },
  },
});

export default theme;