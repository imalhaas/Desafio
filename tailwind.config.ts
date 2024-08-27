import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,svelte,ts}', // Inclui todos os arquivos relevantes
  ],
  theme: {
    extend: {
      // Suas personalizações de tema aqui
    },
  },
  plugins: [
    require('daisyui'), // Adiciona DaisyUI como plugin
  ],
  daisyui: {
    // Configurações opcionais para DaisyUI
    themes: ['light', 'dark'], // Adiciona os temas que você deseja utilizar
  },
};

export default config;
