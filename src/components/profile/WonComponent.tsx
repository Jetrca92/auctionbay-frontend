import { FC } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import chair from 'styles/images/chair.png'

type Auction = {
  title: string
  image: string
  starting_price: number
  duration?: number
  is_done: boolean
}

const auctions: Auction[] = [
  {
    title: 'Old chair',
    image: chair,
    starting_price: 65,
    duration: 24,
    is_done: true,
  },
]
const WonComponent: FC = () => {
  if (auctions.length === 0)
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyStateWon}>
          <div className={styles.captionTitle}>
            <h3>Nothing here yet?</h3>
          </div>
          <div className={styles.caption}>
            When you win auction items will be displayed here! Go on and bid on
            your favorite items!
          </div>
        </div>
      </div>
    )

  return (
    <div className={styles.myAuctions}>
      {auctions.map((auction, index) => (
        <div className={styles.cardBidding} key={index}>
          <div className={styles.content}>
            <div className={styles.tagHeader}>
              {auction.is_done && (
                <div className={styles.tagDone}>
                  <div className={styles.tagText}>Done</div>
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

export default WonComponent
