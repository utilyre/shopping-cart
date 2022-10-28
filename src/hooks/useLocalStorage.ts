import { useState } from 'react'

export const useLocalStorage = <T>(key: string, initialState?: T) => {
  const [stored, setStored] = useState<T>(() => {
    const item = localStorage.getItem(key)
    return item === null ? initialState : JSON.parse(item)
  })

  const setValue = (value: T | ((prev: T) => T)) => {
    const valueToStore = value instanceof Function ? value(stored) : value

    setStored(valueToStore)
    localStorage.setItem(key, JSON.stringify(valueToStore))
  }

  return [stored, setValue] as const
}
