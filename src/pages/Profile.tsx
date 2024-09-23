import styles from 'styles/scss/ProfilePage.module.scss'
import Layout from 'components/ui/Layout'
import { FC } from 'react'
import DashboardStatistics from 'components/profile/DashboardStatistics'
import Content from 'components/profile/Content'

const Profile: FC = () => {
  return (
    <Layout>
      <div className={styles.profilePage}>
        <div className={styles.title}>
          <h1 className={styles.titleText}>Hello Username Usersurname !</h1>
        </div>
        <DashboardStatistics />
        <Content />
      </div>
    </Layout>
  )
}

export default Profile
