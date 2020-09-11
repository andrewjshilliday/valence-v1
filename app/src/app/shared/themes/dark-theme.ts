import { Theme } from './symbols';

export const darkTheme: Theme = {
  name: 'dark',
  properties: {
    '--background': 'rgba(51, 51, 51, 1)',
    '--background-lighter': 'rgba(61, 61, 61, 1)',
    '--background-darker': 'rgba(41, 41, 41, 1)',
    '--on-background': '#f2f2f2',
    '--background-opacity': 'rgba(51, 51, 51, 0)',
    '--primary': '#f40000',
    '--on-primary': '#ffffff',
    '--secondary': '#404040',
    '--on-secondary': '#f2f2f2',
    '--scrollbar': '#ff6666',
    '--accent': '#4d4d4d',
    '--light': '#f2f2f2',
    '--dark': 'rgba(51, 51, 51, 1)',
    // '--surface': '#fff',
    // '--on-surface': '#000',
    // '--error': '#E74E3C',
    // '--on-error': '#fff'
  }
};
