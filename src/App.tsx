import { FC, useState } from 'react'
import Routes from 'routes/Routes'
import { observer } from 'mobx-react'

const App: FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }
  const toggleNotification = () => {
    setIsNotificationVisible(!isNotificationVisible)
  }

  return (
    <Routes
      isOverlayVisible={isOverlayVisible}
      isNotificationVisible={isNotificationVisible}
      toggleOverlay={toggleOverlay}
      toggleNotification={toggleNotification}
    />
  )
}

export default observer(App)
