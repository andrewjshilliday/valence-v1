import { Theme } from './symbols';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--background': 'rgba(255, 255, 255, 1)',
    '--background-lighter': 'rgba(255, 255, 255, 1)',
    '--background-darker': 'rgba(250, 250, 250, 1)',
    '--on-background': '#000000',
    '--background-opacity': 'rgba(255, 255, 255, 0)',
    '--primary': '#f40000',
    '--on-primary': '#fff',
    '--secondary': '#fafafa',
    '--on-secondary': '#000000',
    '--scrollbar': '#ff6666',
    '--accent': 'lightgray',
    '--light': '#f2f2f2',
    '--dark': 'rgba(51, 51, 51, 1)',
    // '--surface': '#fff',
    // '--on-surface': '#000',
    // '--error': '#E74E3C',
    // '--on-error': '#fff'
  }
};
