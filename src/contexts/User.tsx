import { createContext, ReactNode, useContext } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'

export type User = {
  id: number
  name: string
  email: string
}

const UserContext = createContext(
  {} as {
    user: User | undefined
    signup: (name: string, email: string, password: string) => User
    signin: (email: string, password: string) => User
  }
)

export const useUser = () => useContext(UserContext)

type Props = {
  children: ReactNode
}

export const UserProvider = ({ children }: Props) => {
  const [user, setUser] = useLocalStorage<User>('user')

  const signin = (email: string, password: string) => {
    const user = {
      id: 1,
      name: 'bruh',
      email: email,
    }

    setUser(user)
    return user
  }

  const signup = (name: string, email: string, password: string) => {
    const user = {
      id: 1,
      name: name,
      email: email,
    }

    setUser(user)
    return user
  }

  return (
    <UserContext.Provider value={{ user, signin, signup }}>
      {children}
    </UserContext.Provider>
  )
}
