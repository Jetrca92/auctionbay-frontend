import { AuctionType } from 'models/auction'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface OverlayContextType {
  isOverlayVisible: boolean
  toggleOverlay: (defaultValues?: AuctionType) => void
  resetDefaultValues: () => void
  defaultValues?: AuctionType
  isNotificationVisible: boolean
  toggleNotification: () => void
  isUserOptionsVisible: boolean
  toggleUserOptions: () => void
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [defaultValues, setDefaultValues] = useState<AuctionType | undefined>(
    undefined,
  )
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [isUserOptionsVisible, setIsUserOptionsVisible] = useState(false)

  const toggleOverlay = (newDefaultValues?: AuctionType, id?: string) => {
    setDefaultValues(newDefaultValues)
    setIsOverlayVisible((prev) => !prev)
  }

  const resetDefaultValues = () => {
    setDefaultValues(undefined)
  }

  const toggleNotification = () => {
    setIsNotificationVisible((prev) => !prev)
  }

  const toggleUserOptions = () => {
    setIsUserOptionsVisible((prev) => !prev)
  }

  return (
    <OverlayContext.Provider
      value={{
        isOverlayVisible,
        toggleOverlay,
        resetDefaultValues,
        defaultValues,
        isNotificationVisible,
        toggleNotification,
        isUserOptionsVisible,
        toggleUserOptions,
      }}
    >
      {children}
    </OverlayContext.Provider>
  )
}

export const useOverlay = (): OverlayContextType => {
  const context = useContext(OverlayContext)
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider')
  }
  return context
}
