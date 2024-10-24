import { FC } from 'react'
import styles from 'styles/scss/Auctions.module.scss'
import timeIcon from 'styles/images/time.png'
import { AuctionType, calculateHoursLeft } from 'models/auction'
import noImage from 'styles/images/empty-image.png'

interface AuctionCardProps {
  auction: AuctionType // Auction prop type
}

const AuctionCard: FC<AuctionCardProps> = ({ auction }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.tagHeader}>
          <div className={styles.tag}>
            <div className={styles.tagText}>In progress</div>
          </div>
          <div className={styles.timeTag}>
            <div>{calculateHoursLeft(auction)}h</div>
            <div className={styles.timeIcon}>
              <img src={timeIcon} alt="time-icon" />
            </div>
          </div>
        </div>
        <div className={styles.titleContainer}>
          <div className={styles.titleText}>{auction.title}</div>
        </div>
        <div className={styles.price}>{auction.starting_price} €</div>
      </div>

      <div className={styles.imageContainer}>
        {auction.image ? (
          <img
            src={`http://localhost:8080${auction.image}`}
            className={styles.image}
            alt="auctionImage"
          />
        ) : (
          <img src={noImage} className={styles.image} alt="noImage" />
        )}
      </div>
    </div>
  )
}

export default AuctionCard
