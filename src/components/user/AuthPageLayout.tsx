import styles from 'styles/scss/Authentication.module.scss'
import { FC, ReactNode } from 'react'
import AuthImgLeft from 'components/user/AuthImgLeft'

interface Props {
  children: ReactNode | ReactNode[]
}

const AuthPageLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.authPage}>
      <AuthImgLeft />
      <div className={styles.innerDiv}>
        <div className={styles.rightSide}>
          <div className={styles.authContainer}>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default AuthPageLayout
