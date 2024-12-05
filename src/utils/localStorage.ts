const writeItem = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const readItem = (key: string) => {
  return localStorage.getItem(key);
};

const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

export { writeItem, readItem, deleteItem };
