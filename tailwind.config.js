/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./*.{ts, js, jsx, tsx}",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
  };
  