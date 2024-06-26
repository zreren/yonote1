import {defineConfig, presetUno, presetWebFonts} from 'unocss'
export default defineConfig({
    presets: [
        presetUno(),
        presetWebFonts({
            provider: 'google',
            fonts: {
                sans: 'Noto Sans SC',
                mono: ['Fira Code', 'Fira Mono:400,700'],
            },
        }),
        // ...
    ],
    theme: {
        colors: {
            // ...
            'custom-user_gradient_1': 'rgba(205, 233, 251, 1)',
            'custom-user_gradient_2': 'rgba(236, 249, 249, 1)',
            'custom-user_gradient_3': 'rgba(245, 245, 251,0.6)'
        }
    }
})
