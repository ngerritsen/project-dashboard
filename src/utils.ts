export const get = <T>(url: string, options?: any): Promise<T> =>
  fetch(url, options)
    .then((res) => {
      if (res.status >= 400 || res.status < 200 || !res.ok) {
        throw new Error(res.statusText);
      }

      return res;
    })
    .then((res) => res.json());
