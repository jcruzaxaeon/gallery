

# Gallery

## Reference
- TTH: Team Treehouse Online Code-Academy

## Devlog
1. "integrate react-router":
   - [x] [Install, integrate] `react-router`
1. "ini Nav, Search | refactor":
   - [x] [Initialize, Wire] the [Nav, Search]-components
   - [x] Refactor Component function-declarations: from arrow to normal declaration-format
1. "ini PhotoList":
   - [x] Review target HTML design
   - [x] Wire CSS provided by Team Treehouse
   - [x] Initialize PhotoList-component
      > [!NOTE] For React image-paths: `/public`-directory = `/`-path-fragment
      > - React references image filepaths from the `/public`-folder __such that
      > - `<img src='/image.jpg' />` __refers to the:
      > - `/public/image.jpg`-path
1. "wire api key": [x] Obtain, wire Flickr.com API key
1. "commit-0": [x] Initialize project: Vite > GitHub > Download base-project files

## Action Roster
- [ ] Implement a NavBtn-subcomponent to replace hard-coded "Cats, Dogs, Computers" list
   - Include a "data" file in the form of JSON (see "Teachers-component")

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
