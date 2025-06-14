/** @type {import('tailwindcss').Config} */

import daisyui from "daisyui"
export default {
  content: [
     "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          300:"#e0e7fe",
          500:"#3e38a7",
          600:"#5046e4"

        },
        shadBlack:{
          500:"#171717",
          600:"#262626",
          700:"#212121",
          800:"#424242"

        },
        
        
       
      },



    },
  },
  plugins: [daisyui
    ,
  ],
}

