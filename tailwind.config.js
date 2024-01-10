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
        '400': '400px',
        '200': '200px',
      },
      fontSize: {
        '2xl': '36px', 
        'xl': '32px',
        'lg': '24px', 
        'base': '20px',
        'sm': '18px', 
        'xs': '14px', 
        'xxs' : '10px'
      },
      colors: {
        dark_blue: "#001F3F",
        dark_purple: "#635484",
        purple: "#CB8EC1",
        light_purple: "#D8AAD0",
        gray: "#C1C1C1",
        light_gray: "#E6E6E6",
      },
      padding: {
        'nav': '15px 160px',
        'nav-md': '15px 40px',
        'nav-sm': '15px 20px',
        'but-md' : '8px 20px',
        'but-sm' : '5px 10px',
      },
      margin:{
        'ban' : '0 160px',
        'ban-md' : '0 40px',
        'ban-sm' : '0 20px',
      },
      spacing: {
        '1': '5px',
        '2': '8px',
        '3': '10px',
        '4': '16px',
        '5': '20px',
        '10': '50px',
        '11': '60px',
        '12' : '80px',
        '14': '100px',
        '15': '120px',
        '18' : '180px',
        '20' : '200px',
        '25' : '250px',
        '30' : '300px',
        '40': '400px',
      },
      borderRadius: {
        '2': '2px',
        '5': '5px',
        '10': '10px',
      },
    },
    fontFamily: {
      sans: ['Quicksand', 'sans-serif'], // Mengganti 'Graphik' dengan 'Quicksand'
    },
  },
  plugins: [
    
  ],
}