

# Word Gallery
- summary: "Team Treehouse Project: Unit 7",
- filename: "readme.md",
- author: {
   - name: "Joel Cruz",
   - email: "jcruz@axaeon.com", }
- project: {
   - name: "Word Gallery",
   - tier: "practice",
   - type: "unit",
   - id: "7t",
   - description: "Project developed independently, for educational purposes, following broad step-by-step specifications provided by Team Treehouse.", }
- org: {
   - name: "Team Treehouse",
   - description: "Online code academy", }

## Notes
1. Location for configuration-file holding flickr.com API-key: **`src/config.js`**
1. Search for `[CUSTOMCSS]` in `src/index.css` for customized-styling:
   - Style `<h1>`
   - Remove capitalization for `<h2>`
   - Create a `center`-style to keep messages centered on page horizontally (e.g. loading-message)
   - Create a `red`-style to highlight instructions in 404-error's `NotFound`-component
   - Modify behavior for link(`<a>`) `background-color` to elminate "sticky" `:hover`-psuedoclass on touch devices

## Reference
- TTH: Team Treehouse Online Code-Academy

## Devlog
1. (i)mplement 3 static routes for default terms
   - [ ] Can be handled by `search/:query`-route, but spec requires these 3 routes to execute seperately
1. fix global.js filepath in PhotoList
   - [x] Fix filepath for global.js import in PhotoList
1. refactor 03, release candidate
   - [x] refactor 03, clean-up and comment
   - [x] Final pass > Comment > Ready as "release-candidate" (rc)
   - [x] Submit for peer-review
1. refactor 02, add static routes
   - [x] Add "Static"-Routes (unnecessary for functionality, but added per spec)
   - [x] refactor 02
   - [x] check features v. spec
1. refactor 01, add exceeds expectations features
   - [x] Remove all testing logs
   - [x] Remove unused sync-bug trail-solutions
   - [x] Add exceeds-expectations features
1. jank i guard clause for unordered responses
   - [x] "(jank)y-solutions (i)mplement ..."
   - [x] This version has janky solutions to a bunch of issues
   - [x] Used for practice with understanding React render lifecycle
1. move fetch to Api
   - [x]x This version has links setting query-state
1. refactor
   - [x] Prune unecessary code/comments
   - [x] Move loading/setLoading state and logic into PhotoList
1. display images using only url params
   - [x] In order for Search and Nav to access the same display logic
1. add axios package, request flickr data
   - [x] Request and log array of image data from Flickr
1. i search-query route
   - [x] Handles user search-queries
1. integrate react-router
   - [x] [Install, integrate] `react-router`
1. ini Nav, Search | refactor
   - [x] [Initialize, Wire] the [Nav, Search]-components
   - [x] Refactor Component function-declarations: from arrow to normal declaration-format
1. ini PhotoList
   - [x] Review target HTML design
   - [x] Wire CSS provided by Team Treehouse
   - [x] Initialize PhotoList-component
      > [!NOTE] For React image-paths: `/public`-directory = `/`-path-fragment
      > - React references image filepaths from the `/public`-folder __such that
      > - `<img src='/image.jpg' />` __refers to the:
      > - `/public/image.jpg`-path
1. wire api key
   - [x] Obtain, wire Flickr.com API key
1. commit-0
   - [x] Initialize project: Vite > GitHub > Download base-project files

## Action Roster
- [ ] Implement a NavBtn-subcomponent to replace hard-coded "Cats, Dogs, Computers" list
   - Include a "data" file in the form of JSON (see "Teachers-component")

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## `react-router` Notes
- Create routes using `createBrowserRouter`

