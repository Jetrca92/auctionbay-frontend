import { FC } from 'react'
import styles from 'styles/css/navbar/Navbar.module.scss'
import logoImg from 'styles/images/logo.svg'
const Navbar: FC = () => {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.logoDiv}>
          <img src={logoImg} alt="logo" />
        </div>
        <div className={styles.signupDiv}>
          <b>Log in</b> or{' '}
          <button className={styles.signupButton}>Sign up</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
