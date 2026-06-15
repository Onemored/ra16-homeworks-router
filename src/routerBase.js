export const pagesBase = '/ra16-homeworks-router';

export function getBasename(pathname) {
  const isPagesPath = pathname === pagesBase || pathname.startsWith(`${pagesBase}/`);

  return isPagesPath ? pagesBase : '/';
}
