import { FC } from 'react'
import { useQuery } from 'react-query'
import styles from 'styles/scss/ProfilePageLayout.module.scss'
import { userStorage } from 'utils/localStorage'
import * as API from 'api/Api'
import {
  AuctionType,
  calculateTotalEarnings,
  isUserBidding,
} from 'models/auction'
import { isUserWinning } from 'models/bid'

const DashboardStatistics: FC = () => {
  const user = userStorage.getUser()
  const { data } = useQuery(
    ['fetchAuctions'],
    () => {
      return API.fetchAuctions()
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    },
  )
  const allAuctions = data?.data || []
  const totalUserAuctions = allAuctions.filter(
    (auction: AuctionType) => auction.owner.id === user.id,
  )
  const totalBidAuctions: AuctionType[] = []
  const totalWinningAuctions: AuctionType[] = []
  const totalEarnings = calculateTotalEarnings(allAuctions, user)

  allAuctions.forEach((auction: AuctionType) => {
    if (!auction.is_active) return
    if (isUserBidding(auction, user)) totalBidAuctions.push(auction)
    if (isUserWinning(auction)) totalWinningAuctions.push(auction)
  })

  return (
    <div className={styles.dashboardStatistics}>
      <div className={styles.cardDarkBg}>
        <div className={styles.titleFrame}>
          <h4>Earnings</h4>
          <div className={styles.cardSubtitleYellow}>All-time</div>
        </div>
        <div className={styles.cardData}>{totalEarnings} €</div>
      </div>
      <div className={styles.cardWhiteBg}>
        <div className={styles.titleFrame}>
          <h4>Posted auctions</h4>
          <div className={styles.cardSubtitle}>All-time</div>
        </div>
        <div className={styles.cardData}>{totalUserAuctions.length}</div>
      </div>
      <div className={styles.cardWhiteBg}>
        <h4>Currently bidding</h4>
        <div className={styles.cardData}>{totalBidAuctions.length}</div>
      </div>
      <div className={styles.cardWhiteBg}>
        <h4>Currently winning</h4>
        <div className={styles.cardDataGreen}>
          {totalWinningAuctions.length}
        </div>
      </div>
    </div>
  )
}

export default DashboardStatistics
