import { AuctionType } from 'models/auction'
import React, { createContext, useContext, useState, ReactNode } from 'react'

export type OverlayType = 'auction' | 'notification' | 'userOptions' | null

interface OverlayContextType {
  activeOverlay: OverlayType
  toggleOverlay: (defaultValues?: AuctionType) => void
  resetDefaultValues: () => void
  defaultValues?: AuctionType
  toggleNotification: () => void
  toggleUserOptions: () => void
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null)
  const [defaultValues, setDefaultValues] = useState<AuctionType | undefined>(
    undefined,
  )

  const toggleOverlay = (newDefaultValues?: AuctionType, id?: string) => {
    setDefaultValues(newDefaultValues)
    setActiveOverlay((prev) => (prev === 'auction' ? null : 'auction'))
  }

  const toggleNotification = () => {
    setActiveOverlay((prev) =>
      prev === 'notification' ? null : 'notification',
    )
  }

  const toggleUserOptions = () => {
    setActiveOverlay((prev) => (prev === 'userOptions' ? null : 'userOptions'))
  }

  const resetDefaultValues = () => {
    setDefaultValues(undefined)
  }

  return (
    <OverlayContext.Provider
      value={{
        activeOverlay,
        toggleOverlay,
        resetDefaultValues,
        defaultValues,
        toggleNotification,
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
