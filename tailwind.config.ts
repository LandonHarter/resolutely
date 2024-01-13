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
    themes: {
      light: {
        colors: {
          background: {
            DEFAULT: "#fff",
            foreground: "#000"
          },
          primary: {
            DEFAULT: "#33A0D0",
            foreground: "#fff"
          },
          danger: {
            DEFAULT: "#E05270",
            foreground: "#fff"
          },
          success: {
            DEFAULT: "#3BC95A",
            foreground: "#fff"
          },
          warning: {
            DEFAULT: "#F6A636",
            foreground: "#fff"
          }
        }
      }
    }
  })],
}
export default config
