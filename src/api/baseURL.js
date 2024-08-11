export const BASE_URL = import.meta.env.VITE_REACT_APP_VITE_API_URL;

// config.js
let BASE_URL_LOGIN;

async function getPublicIP() {
  try {
console.log();

    const data = import.meta.env.VITE_REACT_APP_VITE_API_URL;
    return data;
  } catch (error) {
    console.error('Error fetching IP address:', error);
    return null;
  }
}

async function setBaseURLLogin() {
  const ip = await getPublicIP();
  if (ip) {
    BASE_URL_LOGIN = import.meta.env.VITE_REACT_APP_VITE_API_URL;
  } else {
    BASE_URL_LOGIN = import.meta.env.VITE_REACT_APP_VITE_API_URL; // fallback to default
  }
}

async function getBaseURLLogin() {
  if (!BASE_URL_LOGIN) {
    await setBaseURLLogin();
  }
  console.log("BASE_URL_LOGIN;",BASE_URL_LOGIN)
  return BASE_URL_LOGIN;
}

// Ensure BASE_URL_LOGIN is set when the module is imported
setBaseURLLogin();

export { getBaseURLLogin };