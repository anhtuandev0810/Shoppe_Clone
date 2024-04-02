import { createContext, useState } from 'react'
import { User } from 'src/types/user.type'
import { getAccessToken, getUser } from 'src/ultis/auth'

interface AppConTextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppConTextInterface = {
  isAuthenticated: Boolean(getAccessToken()),
  setIsAuthenticated: () => null,
  profile: getUser(),
  setProfile: () => null
}
export const AppConText = createContext<AppConTextInterface>(initialAppContext)

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialAppContext.isAuthenticated)
  const [profile, setProfile ] = useState<User | null>(initialAppContext.profile)

  return (
    <AppConText.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile
      }}
    >
      {children}
    </AppConText.Provider>
  )
}
