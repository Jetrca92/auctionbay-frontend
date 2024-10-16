import { FC, ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import NewAuction from 'components/overlays/NewAuction'
import { useOverlay } from 'components/overlays/OverlayContext'
import Notification from 'components/overlays/Notifications'
import UserOptions from 'components/overlays/UserOptions'

interface Props {
  children: ReactNode | ReactNode[]
}

const Layout: FC<Props> = ({ children }) => {
  const {
    activeOverlay,
    toggleOverlay,
    toggleNotification,
    toggleUserOptions,
  } = useOverlay()

  return (
    <>
      <Navbar
        toggleOverlay={toggleOverlay}
        toggleNotification={toggleNotification}
        toggleUserOptions={toggleUserOptions}
      />

      {activeOverlay === 'auction' ? (
        <NewAuction />
      ) : (
        <>
          {activeOverlay === 'notification' && <Notification />}
          {activeOverlay === 'userOptions' && <UserOptions />}
          {children}
        </>
      )}

      <Footer />
    </>
  )
}

export default Layout
