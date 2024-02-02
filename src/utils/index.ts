export const getCookie = (key: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieKey, cookieValue] = cookie.split("=");
    if (cookieKey === key) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
};

export const setCookie = (
  key: string,
  value: string,
  options: { expires?: number; path?: string } = {}
): void => {
  let cookieString = `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + options.expires * 24 * 60 * 60 * 1000);
    cookieString += `; expires=${expirationDate.toUTCString()}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  document.cookie = cookieString;
};
