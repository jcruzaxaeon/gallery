

/*
# Word Gallery - global.js
- author: "Joel Cruz",
- email: "jcruz@axaeon.com",
- description: "Project 7: End-of-unit project developed independently, for educational purposes, following broad step-by-step specifications provided by Team Treehouse (Code Academy).",
- codename: "7t",
--------------------------------------------------------------------------------------------------*/

/*
### Global Query-Tracker
- Flag for tracking query-parameter from most recently requested URL
- Implemented as a custom-import global-variable to avoid UI re-rendering
- Ensures that displayed response matches current URL
--------------------------------------------------------------------------------------------------*/
let currentTerm = '';

export const getCurrentTerm = () => currentTerm;

export function updateCurrentTerm(term) { currentTerm=term; }

