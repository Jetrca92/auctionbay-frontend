import { AuctionType } from 'models/auction'
import React, { createContext, useContext, useState, ReactNode } from 'react'

interface OverlayContextType {
  isOverlayVisible: boolean
  toggleOverlay: (defaultValues?: AuctionType) => void
  resetDefaultValues: () => void
  defaultValues?: AuctionType
}

const OverlayContext = createContext<OverlayContextType | undefined>(undefined)

export const OverlayProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [defaultValues, setDefaultValues] = useState<AuctionType | undefined>(
    undefined,
  )

  const toggleOverlay = (newDefaultValues?: AuctionType, id?: string) => {
    setDefaultValues(newDefaultValues)
    setIsOverlayVisible((prev) => !prev)
  }

  const resetDefaultValues = () => {
    setDefaultValues(undefined)
  }

  return (
    <OverlayContext.Provider
      value={{
        isOverlayVisible,
        toggleOverlay,
        resetDefaultValues,
        defaultValues,
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
