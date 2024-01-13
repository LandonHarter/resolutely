import { nextui } from '@nextui-org/react'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  plugins: [nextui({
    defaultTheme: "light",
    prefix: "resolutely",
    themes: {
      light: {
        colors: {
          background: {
            DEFAULT: "#fff",
            foreground: "#000"
          },
          primary: {
            50: "#ecf6fb",
            100: "#daecf6",
            200: "#b5d9ed",
            300: "#8fc6e4",
            400: "#66b3da",
            500: "#33a0d0",
            600: "#2b8bb5",
            700: "#23769a",
            800: "#144e67",
            900: "#072939",
            DEFAULT: "#33A0D0",
            foreground: "#fff"
          },
          danger: {
            50: "#ffeef0",
            100: "#fedee1",
            200: "#fabdc4",
            300: "#f39ba7",
            400: "#eb788b",
            500: "#e05270",
            600: "#c34660",
            700: "#8a2f43",
            800: "#561a27",
            900: "#27080e",
            DEFAULT: "#E05270",
            foreground: "#fff"
          },
          success: {
            50: "#eefaef",
            100: "#ddf5df",
            200: "#bbebbf",
            300: "#97e09f",
            400: "#6fd57d",
            500: "#3bc95a",
            600: "#32ae4d",
            700: "#217c35",
            800: "#114c1e",
            900: "#042209",
            DEFAULT: "#3BC95A",
            foreground: "#fff"
          },
          warning: {
            50: "#fff6ed",
            100: "#ffeedb",
            200: "#fdddb7",
            300: "#fccb92",
            400: "#f9b96a",
            500: "#f6a636",
            600: "#d6902e",
            700: "#98651e",
            800: "#5f3e0f",
            900: "#2c1a03",
            DEFAULT: "#F6A636",
            foreground: "#fff"
          }
        }
      }
    }
  })],
}
export default config
