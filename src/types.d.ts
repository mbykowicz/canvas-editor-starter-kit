declare type Enum<T extends Record<string, number | string | boolean>> =
  T[keyof T]
