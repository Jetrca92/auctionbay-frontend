import { FC } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import timeIcon from 'styles/images/time.png'
import microphone from 'styles/images/microphone.png'
import chair from 'styles/images/chair.png'

const auctions = [
  {
    title: 'Old chair',
    image: microphone,
    starting_price: 65,
    duration: 24,
    is_winning: true,
  },
  {
    title: 'Old chair',
    image: chair,
    starting_price: 65,
    duration: 24,
    is_winning: false,
  },
]
const BiddingComponent: FC = () => {
  return (
    <div className={styles.myAuctions}>
      {auctions.map((auction, index) => (
        <div className={styles.cardBidding} key={index}>
          <div className={styles.content}>
            <div className={styles.tagHeader}>
              {auction.is_winning ? (
                <div className={styles.tagWinning}>
                  <div className={styles.tagText}>Winning</div>
                </div>
              ) : (
                <div className={styles.tagOutbid}>
                  <div className={styles.tagText}>Outbid</div>
                </div>
              )}
              {auction.duration && (
                <div className={styles.timeTag}>
                  <div>{auction.duration}h</div>
                  <div className={styles.timeIcon}>
                    <img src={timeIcon} alt="time-icon" />
                  </div>
                </div>
              )}
            </div>
            <div className={styles.titleContainer}>
              <div className={styles.titleText}>{auction.title}</div>
            </div>
            <div className={styles.price}>{auction.starting_price} €</div>
          </div>

          <div className={styles.imageContainer}>
            <img
              src={auction.image}
              alt={auction.title}
              className={styles.image}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BiddingComponent
