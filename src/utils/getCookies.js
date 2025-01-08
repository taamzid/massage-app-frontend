export const getCookie = (name) => {
  const cookies = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return cookies ? decodeURIComponent(cookies.split("=")[1]) : null;
};

export const setCookie = (name, value, days, options = {}) => {
  if (typeof name !== "string" || typeof value !== "string" || typeof days !== "number") {
    throw new Error("Invalid input: name and value should be strings, days should be a number");
  }

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const secure = options.secure ? "; Secure" : "";
  const sameSite = options.sameSite || "Lax";
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/; SameSite=${sameSite}${secure}`;
};

export const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const getAllCookies = () => {
  return document.cookie.split("; ").reduce((acc, row) => {
    const [key, value] = row.split("=");
    acc[key] = decodeURIComponent(value);
    return acc;
  }, {});
};

export const deleteAllCookies = () => {
  document.cookie.split("; ").forEach((row) => {
    const [key] = row.split("=");
    deleteCookie(key);
  });
};

export const updateCookie = (name, newValue, days, options = {}) => {
  if (getCookie(name) !== null) {
    setCookie(name, newValue, days, options);
  } else {
    console.warn(`Cookie with name "${name}" does not exist`);
  }
};

export const isCookieExpired = (name) => {
  const cookie = getCookie(name);
  return cookie === null;
};

export const parseCookies = () => {
  return document.cookie.split("; ").map((row) => {
    const [key, ...rest] = row.split("=");
    return { name: key, value: decodeURIComponent(rest.join("=")) };
  });
};
