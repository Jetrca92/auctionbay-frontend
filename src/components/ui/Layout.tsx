import { FC, ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import NewAuction from 'components/overlays/NewAuction'
import { useOverlay } from 'components/overlays/OverlayContext'
import Notification from 'components/overlays/Notifications'

interface Props {
  children: ReactNode | ReactNode[]
}

const Layout: FC<Props> = ({ children }) => {
  const {
    isOverlayVisible,
    toggleOverlay,
    isNotificationVisible,
    toggleNotification,
  } = useOverlay()

  return (
    <>
      <Navbar
        toggleOverlay={toggleOverlay}
        toggleNotification={toggleNotification}
      />

      {isOverlayVisible ? <NewAuction /> : <div>{children}</div>}
      {isNotificationVisible ? <Notification /> : <div>{children}</div>}
      <Footer />
    </>
  )
}

export default Layout
