import { FC } from 'react'
import styles from 'styles/scss/LandingPage.module.scss'
import heroImg from '../../styles/images/auctions_landing.png'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routesConstants'
const Hero: FC = () => {
  return (
    <>
      <div className={styles.heroDiv}>
        <div className={styles.heroDivTitle}>E-auctions made easy!</div>
        <div className={styles.heroDivText}>
          Simple way for selling your unused products, or
          <br />
          getting a deal on product you want!
        </div>
      </div>
      <Link className={styles.callToActionButton} to={routes.SIGNUP}>
        Start bidding
      </Link>
      <img src={heroImg} className={styles.auctionsImg} alt="auctions" />
    </>
  )
}

export default Hero
