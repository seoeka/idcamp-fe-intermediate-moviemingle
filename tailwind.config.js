/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      fontSize: {
        '2lg': '40px',
        '2xl': '36px', 
        'xl':  '32px',
        'lg':  '24px', 
        'base':'20px',
        'sm':  '18px', 
        'xs':  '14px', 
        'xxs': '10px'
      },
      boxShadow: {
        'poster': '0 0 30px 5px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        dark_blue: "#001F3F",
        dark_purple: "#635484",
        purple: "#CB8EC1",
        light_purple: "#D8AAD0",
        gray: "#C1C1C1",
        light_gray: "#E6E6E6",
      },
      margin:{
        'ban' : '0 160px',
        'ban-lg' : '90px 90px',
        'ban-md' : '60px 60px',
        'ban-sm' : '20px 20px',
      },
      padding:{
        '15' : '15px 0',
        'but' : '8px 20px',
        'sid' : '16px 32px',
      },
      spacing: {
        '1': '5px',
        '2': '8px',
        '3': '10px',
        '4': '16px',
        '5': '20px',
        '6': '28px',
        '7': '35px',
        '10': '50px',
        '11': '60px',
        '12' : '80px',
        '14': '100px',
        '15': '120px',
        '16': '160px',
        '18' : '180px',
        '20' : '200px',
        '25' : '250px',
        '26' : '265px',
        '30' : '300px',
        '38' : '380px',
        '40': '400px',
        'co': '90%',
        'co-xl': '1120px',
      },
      borderRadius: {
        '2': '2px',
        '5': '5px',
        '10': '10px',
      },
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'],
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}