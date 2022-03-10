module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
     screens: {
       'xs': '375px',
       // => @media (min-width: 375px) { ... }

       'sm': '720px',
       // => @media (min-width: 720px) { ... }

       'md': '1080px',
       // => @media (min-width: 1080px) { ... }

       'lg': '1280px',
       // => @media (min-width: 1280px) { ... }

       'xl': '1512px',
       // => @media (min-width: 1512px) { ... }

     }
  },
  plugins: [],
}
