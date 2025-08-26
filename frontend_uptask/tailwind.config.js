/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                varela: ['"Varela Round"', 'sans-serif'],
            }
        },
    },
    plugins: [],
}

