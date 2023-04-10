/** @type {import('tailwindcss').Config} */
const color = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
        xs: "350px",
        ...defaultTheme.screens
    },  
    extend: {
      
    },
	},
	plugins: [],
};
