// Function to get a cookie value by name
export const getCookie = (name) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookies ? cookies.split("=")[1] : null;
};

// Function to set a cookie
export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const secure = location.protocol === "https:" ? "Secure;" : "";
  document.cookie = `${name}=${value};${expires};path=/;${secure}`;
};

// Function to delete a cookie
export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Function to check if a cookie exists

export const checkCookie = (name) => {
  return document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
};

// Function to get all cookies
export const getAllCookies = () => {
  return document.cookie.split("; ").map((row) => {
    const [key, value] = row.split("=");
    return { key, value };
  });
};

// Function to delete all cookies
export const deleteAllCookies = () => {
  document.cookie.split("; ").forEach((row) => {
    const [key] = row.split("=");
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};

// Function to set multiple cookies

export const setMultipleCookies = (cookies) => {
  cookies.forEach((cookie) => {
    const { name, value, days } = cookie;
    setCookie(name, value, days);
  });
};

// Function to get multiple cookies
export const getMultipleCookies = (cookies) => {
  return cookies.map((cookie) => {
    const { name } = cookie;
    return getCookie(name);
  });
};

// Function to delete multiple cookies
export const deleteMultipleCookies = (cookies) => {
  cookies.forEach((cookie) => {
    const { name } = cookie;
    deleteCookie(name);
  });
};

// Function to check if multiple cookies exist
export const checkMultipleCookies = (cookies) => {
  return cookies.map((cookie) => {
    const { name } = cookie;
    return checkCookie(name);
  });
};

// Function to get all cookies
