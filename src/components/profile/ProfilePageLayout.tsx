import styles from 'styles/scss/ProfilePageLayout.module.scss'
import { FC, ReactNode } from 'react'
import DashboardStatistics from './DashboardStatistics'
import Content from './Content'
import { userStorage } from 'utils/localStorage'

interface Props {
  children: ReactNode | ReactNode[]
}

const ProfilePageLayout: FC<Props> = ({ children }) => {
  const user = userStorage.getUser()
  return (
    <div className={styles.profilePage}>
      <div className={styles.title}>
        <h1 className={styles.titleText}>
          Hello {user.first_name} {user.last_name} !
        </h1>
      </div>
      <DashboardStatistics />
      <Content>{children}</Content>
    </div>
  )
}

export default ProfilePageLayout
