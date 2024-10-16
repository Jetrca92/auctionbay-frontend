import { FC, useState } from 'react'
import Routes from 'routes/Routes'
import { observer } from 'mobx-react'

const App: FC = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const [isUserOptionsVisible, setIsUserOptionsVisible] = useState(false)
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible)
  }
  const toggleNotification = () => {
    setIsNotificationVisible(!isNotificationVisible)
  }
  const toggleUserOptions = () => {
    setIsUserOptionsVisible(!isUserOptionsVisible)
  }

  return (
    <Routes
      isOverlayVisible={isOverlayVisible}
      isNotificationVisible={isNotificationVisible}
      isUserOptionsVisible={isUserOptionsVisible}
      toggleOverlay={toggleOverlay}
      toggleNotification={toggleNotification}
      toggleUserOptions={toggleUserOptions}
    />
  )
}

export default observer(App)
