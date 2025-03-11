/** @type {import('tailwindcss').Config} */
const {heroui} = require("@heroui/react");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	darkMode: ["class"],
	content: [
	  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	  "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	  extend: {
		colors: {
		  background: "var(--background)",
		  foreground: "var(--foreground)",
		  primary: "#0057A8",
		  secondary: "#E38E49",
		  Cardbg: "#E5E5E5",
		  mainbg: "#FAFAFA",
		  fieldbg: "#F2F2F8",
		  Textcolor: "#3B3232",
		  Description: "#353B43",
		  label: "#52525B",
		  textDescription: "#666666",
		  seatColor:"#C31162",
		  pay:"#D20000",
		  category:"#C0D6EE",
		},
		boxShadow: {
		  custom: "2px 3px 15px rgba(0, 0, 0, 0.07)",
		  custom2: "3px 3px 15px rgba(0, 0, 0, 0.08)",
		},
	  },
	},
	plugins: [require("tailwindcss-animate"),heroui()],
  };
  