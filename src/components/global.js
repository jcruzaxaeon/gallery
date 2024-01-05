

// global.js

let lastRequest = '';

export const getLastRequest = () => lastRequest;

export function setLastRequest(requestString) {
  lastRequest=requestString;
}

