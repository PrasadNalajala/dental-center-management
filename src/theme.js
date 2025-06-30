import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1', // A deep, professional blue
    },
    secondary: {
      main: '#d32f2f', // A standard red for delete/errors
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          color: '#333',
          backdropFilter: 'blur(6px)',
          boxShadow: 'none',
          borderBottom: '1px solid #e0e0e0',
        }
      }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: 'none',
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: '12px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: {
                borderRadius: '8px',
                textTransform: 'none',
                fontWeight: 600,
            }
        }
    },
    MuiTableRow: {
        styleOverrides: {
            root: {
            '&:nth-of-type(odd)': {
                backgroundColor: '#fafafa',
            },
            '&:hover': {
                backgroundColor: '#f0f0f0',
            },
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                fontWeight: 'bold',
                backgroundColor: '#f4f6f8'
            }
        }
    }
  }
});

export default theme; 