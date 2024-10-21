import { FC } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import { AuctionType, getMinBidAmount } from 'models/auction'
import { hasUserWon } from 'models/bid'
import noImage from 'styles/images/empty-image.png'

const WonComponent: FC = () => {
  const { data, isLoading } = useQuery(
    ['fetchAuctions'],
    () => API.fetchAuctions(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )
  const userWonAuctions: AuctionType[] = []

  if (data) {
    const allAuctions: AuctionType[] = data.data
    allAuctions.forEach((auction: AuctionType) => {
      if (hasUserWon(auction)) {
        userWonAuctions.push(auction)
      }
    })
  }

  if (isLoading) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyStateBidding}>
          <div className={styles.caption}>Loading ...</div>
        </div>
      </div>
    )
  }

  if (userWonAuctions.length === 0)
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
      {userWonAuctions.map((auction, index) => (
        <div className={styles.cardBidding} key={index}>
          <div className={styles.content}>
            <div className={styles.tagHeader}>
              {!auction.is_active && (
                <div className={styles.tagDone}>
                  <div className={styles.tagText}>Done</div>
                </div>
              )}
            </div>
            <div className={styles.titleContainer}>
              <div className={styles.titleText}>{auction.title}</div>
            </div>
            <div className={styles.price}>{getMinBidAmount(auction) - 1} €</div>
          </div>
          <div className={styles.imageContainer}>
            {auction.image ? (
              <img
                src={`http://localhost:8080${auction.image}`}
                alt={auction.title}
                className={styles.image}
              />
            ) : (
              <img src={noImage} alt={auction.title} className={styles.image} />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default WonComponent
