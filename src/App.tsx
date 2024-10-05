import { FC, useState } from 'react'
import Routes from 'routes/Routes'
import { observer } from 'mobx-react'

const App: FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }

  return (
    <Routes isOverlayVisible={isOverlayVisible} toggleOverlay={toggleOverlay} />
  )
}

export default observer(App)
