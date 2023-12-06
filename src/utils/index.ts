import url from 'url';
import { type EnvVars } from '@/types';

const getEnvironmentVariable = (key: keyof EnvVars): string =>
  process.env[key] as string;

const setEnvironmentVariable = (key: keyof EnvVars, val: string): void => {
  process.env[key] = val;
};

function getHostURL(host: string, protocol: string): string {
  return url.format({
    protocol,
    host,
  });
}

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const delay = async (ms: number): Promise<number> =>
  new Promise((resolve) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(() => {
      resolve(0);
    }, ms),
  );

const isHexString = (value: string): boolean => {
  const hexRegex = /^[0-9a-fA-F]+$/;
  return hexRegex.test(value);
};

export {
  getEnvironmentVariable,
  setEnvironmentVariable,
  getHostURL,
  isValidEmail,
  delay,
  isHexString,
};
