const isBrowser = typeof window !== 'undefined'

const setToStorage = (key: string, value: string, isJson: boolean = false) => {
  if (isBrowser) {
    try {
      const data = isJson ? JSON.stringify(value) : value
      localStorage.setItem(key, data)
    } catch (e) {
      console.error(e)
    }
  }
}

const getFromStorage = (key: string, isJson: boolean = false) => {
  if (isBrowser) {
    const value = localStorage.getItem(key)
    return value ? (isJson ? JSON.parse(value) : value) : null
  }
  return null
}

const removeFromStorage = (key: string) => {
  if (isBrowser) {
    try {
      localStorage.removeItem(key)
    } catch (e) {
      console.error(e)
    }
  }
}

export { setToStorage, getFromStorage, removeFromStorage }
