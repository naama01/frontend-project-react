import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  direction: 'rtl', // RTL support for Hebrew/Arabic

  palette: {
    primary: {
      main: '#B8D900', // keep original green-yellow
    },
    secondary: {
      main: '#61CE70', // keep original green
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#666',
    },
  },

  shape: {
    borderRadius: 12, // smoother rounded UI elements
  },

  spacing: 8, // MUI default (can be adjusted if needed)

  typography: {
    fontFamily: '"Rubik", "Alef", "Arial", sans-serif',
    fontSize: 14,
    h4: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },

  components: {
    // Buttons
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 20,
          paddingBlock: 10,
        },
        containedPrimary: {
          color: '#fff',
        },
      },
    },

    // Text fields
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },

    // Chip styling
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 10,
        },
      },
    },

    // Paper/card containers
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
});

// Responsive font sizes for accessibility & mobile
theme = responsiveFontSizes(theme);

export default theme;
