/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                void: {
                    950: '#0a0809',
                    900: '#0d0b0e',
                    800: '#141018',
                    700: '#1c1523',
                    600: '#261d30',
                    500: '#322040',
                },
                parchment: {
                    50: '#fdf8ef',
                    100: '#f5ead6',
                    200: '#e8dcc8',
                    300: '#d4c4a8',
                    400: '#bfa882',
                },
                gold: {
                    300: '#e8c97a',
                    400: '#d4a843',
                    500: '#c9a84c',
                    600: '#a8862e',
                    700: '#7d6020',
                },
                blood: {
                    400: '#c0392b',
                    500: '#8b1a1a',
                    600: '#6b1212',
                },
                mythos: {
                    400: '#7c6b9e',
                    500: '#5c4f7a',
                    600: '#3d3352',
                },
            },
            fontFamily: {
                display: ['Cinzel', 'Georgia', 'serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
            },
            backgroundImage: {
                'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E\")",
            },
        },
    },
    plugins: [],
}
