import { FC } from 'react'
import styles from 'styles/scss/ProfilePage.module.scss'

const DashboardStatistics: FC = () => {
  return (
    <div className={styles.dashboardStatistics}>
      <div className={styles.cardDarkBg}>
        <div className={styles.titleFrame}>
          <h4>Earnings</h4>
          <div className={styles.cardSubtitleYellow}>All-time</div>
        </div>
        <div className={styles.cardData}>324 €</div>
      </div>
      <div className={styles.cardWhiteBg}>
        <div className={styles.titleFrame}>
          <h4>Posted auctions</h4>
          <div className={styles.cardSubtitle}>All-time</div>
        </div>
        <div className={styles.cardData}>18</div>
      </div>
      <div className={styles.cardWhiteBg}>
        <h4>Currently bidding</h4>
        <div className={styles.cardData}>5</div>
      </div>
      <div className={styles.cardWhiteBg}>
        <h4>Currently winning</h4>
        <div className={styles.cardDataGreen}>2</div>
      </div>
    </div>
  )
}

export default DashboardStatistics
