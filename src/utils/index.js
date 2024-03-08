import slugify from 'slugify';

export const BASE_URL = 'https://api.mwape.org/';
export const ACCESS_KEY = 'jwtAccessToken';
export const REFRESH_KEY = 'jwtRefreshToken';

export const generateSlug = (name) => slugify(name, { lower: true });

export const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateUniqueSKU = () => {
  const productAttributes = 'SKU';
  const randomString = generateRandomString(6);
  const uniqueSKU = `${productAttributes}-${randomString}`;
  return uniqueSKU;
};
