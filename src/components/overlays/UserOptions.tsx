import { FC } from 'react'
import styles from 'styles/scss/Overlays.module.scss'
import settingsIcon from 'styles/images/settings.png'

const UserOptions: FC = () => {
  return (
    <div className={styles.userOptionsContainer}>
      <div className={styles.userOptionsButton}>
        <img
          src={settingsIcon}
          alt="settings"
          className={styles.userOptionsButtonIcon}
        />
        Profile settings
      </div>
      <button className={styles.userLogoutButton}>Log out</button>
    </div>
  )
}

export default UserOptions
