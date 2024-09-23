import styles from 'styles/scss/ProfilePageLayout.module.scss'
import { FC, ReactNode } from 'react'
import DashboardStatistics from './DashboardStatistics'
import Content from './Content'

interface Props {
  children: ReactNode | ReactNode[]
}

const ProfilePageLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.profilePage}>
      <div className={styles.title}>
        <h1 className={styles.titleText}>Hello Username Usersurname !</h1>
      </div>
      <DashboardStatistics />
      <Content>{children}</Content>
    </div>
  )
}

export default ProfilePageLayout
