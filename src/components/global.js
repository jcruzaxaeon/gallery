

// global.js

let iniData = {};

export const getIniData = () => iniData;

export function updateIniData(name, data) {
  iniData = {...iniData, [`${name}`]: data}
}

