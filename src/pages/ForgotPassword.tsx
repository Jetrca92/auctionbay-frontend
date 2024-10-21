import AuthPageLayout from 'components/user/AuthPageLayout'
import styles from 'styles/scss/Authentication.module.scss'
import logo from 'styles/images/logo.svg'

import { FC } from 'react'

import ForgotPasswordForm from 'components/user/ForgotPasswordForm'

const ForgotPassword: FC = () => {
  return (
    <AuthPageLayout>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <ForgotPasswordForm />
    </AuthPageLayout>
  )
}

export default ForgotPassword
