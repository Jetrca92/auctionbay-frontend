import { FC } from 'react'
import styles from 'styles/scss/MyAuctions.module.scss'
import * as API from 'api/Api'
import { useQuery } from 'react-query'
import { AuctionType } from 'models/auction'
import { userStorage } from 'utils/localStorage'

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
    const user = userStorage.getUser()
    const allAuctions: AuctionType[] = data.data
    allAuctions.forEach((auction: AuctionType) => {
      if (has(auction, user)) {
        userBiddedAuctions.push(auction)
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
