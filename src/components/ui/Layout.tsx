import { FC, ReactNode, useState } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import NewAuction from 'components/overlays/NewAuction'

interface Props {
  children: ReactNode | ReactNode[]
}

const Layout: FC<Props> = ({ children }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }

  return (
    <>
      <Navbar toggleOverlay={toggleOverlay} />
      <div>{children}</div>
      {isOverlayVisible && <NewAuction toggleOverlay={toggleOverlay} />}
      <Footer />
    </>
  )
}

export default Layout
