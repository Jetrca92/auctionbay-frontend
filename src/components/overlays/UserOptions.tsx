import { FC } from 'react'
import styles from 'styles/scss/Overlays.module.scss'
import settingsIcon from 'styles/images/settings.png'
import { useNavigate } from 'react-router-dom'
import authStore from 'stores/auth.store'
import { useOverlay } from './OverlayContext'

const UserOptions: FC = () => {
  const navigate = useNavigate()
  const { toggleUserOptions } = useOverlay()
  const logout = async () => {
    authStore.signout()
    navigate('/')
  }
  return (
    <div className={styles.userOptionsContainer}>
      <div
        className={styles.userOptionsButton}
        onClick={() => {
          navigate('/profile/update-password')
          toggleUserOptions()
        }}
      >
        <img
          src={settingsIcon}
          alt="settings"
          className={styles.userOptionsButtonIcon}
        />
        Profile settings
      </div>
      <button
        className={styles.userLogoutButton}
        onClick={() => {
          logout()
          toggleUserOptions()
        }}
      >
        Log out
      </button>
    </div>
  )
}

export default UserOptions
