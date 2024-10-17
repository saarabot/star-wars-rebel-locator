# About the application

- single page application
- user can immediately see the map of the world (planet Earth), covered with markers of the secret locations decrypted from the secret.json.
- user should also be able to set their own location by clicking on the map
- When the user location is set, a list should appear
- each item on the list corresponds to a location
- and should render the data available for the entity which awaits on that location, in addition to the distance from the user to the entity.
- The list should be sorted from closest to farthest.

# TODO:

## responsive size

## size with tailwind classes

## context/redux?

## build/host/gh actions and pages

## Sources and additional info

- data/countries.json
- source from Openlayers workshop repo
  https://github.com/openlayers/workshop/blob/main/src/en/data/countries.json?short_path=afdfc39

## Links to remember (for personal use :D)

https://tailwindcss.com/docs/responsive-design

# React + TypeScript + Vite

Template info

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```
