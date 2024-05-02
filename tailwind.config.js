/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // https://colorhunt.co/palette/070f2b1b1a55535c919290c3
        // primary: "#9290C3",
        // secondary: {
        //   100: "#E2E2D5",
        //   200: "#888883",
        // },
      },
    },
  },
  plugins: [],
};
