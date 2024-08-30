/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false,
  },
  separator: '_',
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./app.{js,ts,vue}`,
    // `${srcDir}/Error.{js,ts,vue}`,
    // `${srcDir}/error.{js,ts,vue}`,
  ],
  theme: {
    extend: {

    },
  },
  plugins: [],
}

