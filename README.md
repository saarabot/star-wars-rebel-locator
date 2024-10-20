# About the application

A <i>retroish</i> map application for locating rebels on earth.

## Features

- single page application
- user can immediately see the map of the world (planet Earth), covered with markers of the secret locations decrypted from the secret.json.
- user should also be able to set their own location by clicking on the map
- When the user location is set, a list should appear
- each item on the list corresponds to a location
- the app render the data available for the entity which awaits on that location, in addition to the distance from the user to the entity.
- The list should be sorted from closest to farthest

## Libraries and Techniques

- **React**: A JavaScript library for building user interfaces.
- **Redux Toolkit**: For state management, including asynchronous requests with `createApi` and `fetchBaseQuery`.
- **OpenLayers**: For rendering and interacting with maps.
- **Tailwind CSS**: For styling the application with utility-first CSS.
- **Framer Motion**: For animations and transitions.
- **React Typed**: For typing animations to enhance the retro vibe.
- **TypeScript**: For static type checking and improved developer experience.

## Sources and additional info

- data/countries.json
  -- from Openlayers workshop repo
  https://github.com/openlayers/workshop/blob/main/src/en/data/countries.json?short_path=afdfc39
- assets\Red_triangle_with_thick_white_border.svg
  -- from https://commons.wikimedia.org/wiki/Category:SVG_map_pointers#
