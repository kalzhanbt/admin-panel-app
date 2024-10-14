import { createTheme } from '@mui/material/styles';
import { PaletteOptions } from '@mui/material/styles/createPalette';

// Расширение интерфейсов для пользовательских цветов
declare module '@mui/material/styles' {
  interface Palette {
    dark: string;
    blue: string;
  }
  interface PaletteOptions {
    dark: string;
    blue: string;
  }
}

const palette: PaletteOptions = {
  mode: 'light',
  dark: '#111114',
  blue: '#1D8DE1ƒ'
}

// A custom theme for this app
const theme = createTheme({
  palette,
  typography: {
    "fontFamily": `"Inter", "Helvetica", "Arial", sans-serif`,
    "fontSize": 16,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500,

    h3: {
      fontSize: "32px",
      fontWeight: "500",
      lineHeight: "36px",
    },
    h4: {
      fontSize: "20px",
      fontWeight: "500",
      lineHeight: "28px",
    }
  }
});

export default theme;