import { FC } from 'react'
import Layout from 'components/ui/Layout'
import styles from 'styles/scss/Overlays.module.scss'
import ChangePasswordForm from 'components/overlays/ChangePasswordForm'

const ChangePassword: FC = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.changePasswordContainer}>
          <div className={styles.changePasswordTitle}>Change password</div>
          <ChangePasswordForm />
        </div>
      </div>
    </Layout>
  )
}

export default ChangePassword
