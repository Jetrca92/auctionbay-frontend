import { FC } from 'react'
import Routes from 'routes/Routes'
import { observer } from 'mobx-react'
import { useOverlay } from 'components/overlays/OverlayContext'

const App: FC = () => {
  const {
    activeOverlay,
    toggleOverlay,
    toggleNotification,
    toggleUserOptions,
  } = useOverlay()

  return (
    <Routes
      activeOverlay={activeOverlay}
      toggleOverlay={toggleOverlay}
      toggleNotification={toggleNotification}
      toggleUserOptions={toggleUserOptions}
    />
  )
}

export default observer(App)
