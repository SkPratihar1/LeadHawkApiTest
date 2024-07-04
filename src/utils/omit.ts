

export function omit<T extends Record<string, any>>(obj: T, keys: (keyof T)[]): Omit<T, keyof T> {
    const newObj = { ...obj };
    for (const key of keys) {
      delete newObj[key];
    }
    return newObj;
  }