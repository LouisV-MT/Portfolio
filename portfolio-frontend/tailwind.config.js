/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                'dark-slate': '#405D72',
                'mid-slate': '#758694',
                'beige': '#F7E7DC',
                'off-white': '#FFF8F3',
            },
            fontFamily: {
                'sans': ['Inter', 'sans-serif'],
                'mono': ['Roboto Mono', 'monospace'],
            }
        },
    },
    plugins: [],
}