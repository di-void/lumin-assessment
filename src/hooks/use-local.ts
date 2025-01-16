export function useLocalStorage() {
  // bad binding to comments alone
  async function getFromLocalStorage<T>(key: "comments") {
    const comments = localStorage.getItem(key);
    if (!comments) {
      return null;
    }

    return JSON.parse(comments) as T;
  }

  async function saveToLocalStorage<T>(key: "comments", payload: T) {
    const py = JSON.stringify(payload);
    localStorage.setItem(key, py);
  }

  return {
    saveToLocalStorage,
    getFromLocalStorage,
  };
}
