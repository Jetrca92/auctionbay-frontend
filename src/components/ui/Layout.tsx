import { FC, ReactNode } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import NewAuction from 'components/overlays/NewAuction'
import { useOverlay } from 'components/overlays/OverlayContext'

interface Props {
  children: ReactNode | ReactNode[]
}

const Layout: FC<Props> = ({ children }) => {
  const { isOverlayVisible, toggleOverlay } = useOverlay()

  return (
    <>
      <Navbar toggleOverlay={toggleOverlay} />

      {isOverlayVisible ? <NewAuction /> : <div>{children}</div>}
      <Footer />
    </>
  )
}

export default Layout
