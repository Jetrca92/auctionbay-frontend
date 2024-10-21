import { FC } from 'react'
import authImg from 'styles/images/register_img.png'
import styles from 'styles/scss/Authentication.module.scss'

const AuthImgLeft: FC = () => {
  return <img src={authImg} className={styles.authImage} alt="auctions" />
}

export default AuthImgLeft
