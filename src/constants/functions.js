export function queryString(str) {
  const obj = {};
  const arr = str.substr(1).split('&');
  for (const i of arr) {
    const a = i.split('=');
    obj[a[0]] = a[1];
  }
  return obj;
}
