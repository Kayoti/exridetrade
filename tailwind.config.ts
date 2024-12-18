import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans]
      },
      animation: {
        'move-right-left': 'moveRightLeft 10s linear infinite' // Custom animation
      },
      keyframes: {
        moveRightLeft: {
          '0%': { transform: 'translateX(100%)' }, // Start from right
          '100%': { transform: 'translateX(-100%)' } // End at left
        }
      }
    }
  }
}
