import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  direction: 'rtl',

  palette: {
    primary: {
      main: '#B8D900',
    },
    secondary: {
      main: '#61CE70',
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
    borderRadius: 12,
  },

  spacing: 8,

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
    // BUTTONS
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        fullWidth: false,
      },
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

    // TEXT FIELDS & INPUTS
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        margin: 'dense',
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
        input: {
          padding: '10.5px 14px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          fontSize: '0.95rem',
        },
      },
    },

    // ICON BUTTONS
    MuiIconButton: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
        root: {
          padding: 8,
          borderRadius: 8,
          '& svg': {
            fontSize: '1.5rem',
          },
        },
      },
    },

    // ICONS
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          verticalAlign: 'middle',
        },
      },
    },

    // TABLES
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        root: {
          direction: 'rtl',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#f0f0f0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          textAlign: 'right',
          padding: '10px 14px',
        },
        head: {
          fontWeight: 600,
          fontSize: '0.9rem',
        },
        body: {
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        },
      },
    },

    // CHIPS
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 10,
        },
      },
    },

    // CARDS & SURFACES
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        },
      },
    },

    // BOX
    MuiBox: {
      styleOverrides: {
        root: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
      },
    },

    // TOOLTIPS
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: '0.85rem',
          borderRadius: 6,
          direction: 'rtl',
        },
      },
    },

    // DIALOGS
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
          padding: '16px',
        },
      },
    },

    // TABS
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: 3,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    

    // LIST ITEM ICON (for icons in menus)
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
          color: 'inherit',
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
