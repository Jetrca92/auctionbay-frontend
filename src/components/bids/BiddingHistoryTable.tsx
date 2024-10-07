import { FC } from 'react'
import styles from 'styles/scss/Auction.module.scss'
import avatar from 'styles/images/Avatar.png'
import { BidType } from 'models/bid'
import { AuctionType } from 'models/auction'

interface BidHistoryTableProps {
  bid: BidType
  auction: AuctionType
}

const BiddingHistoryTable: FC<BidHistoryTableProps> = ({ bid }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const day = String(date.getDate())
    const month = String(date.getMonth() + 1) // Months are zero-based
    const year = date.getFullYear()

    const formattedDate = `${hours}:${minutes} ${day}.${month}.${year}`
    return formattedDate
  }

  return (
    <div className={styles.biddingHistoryTable}>
      <div className={styles.tableItem}>
        <div className={styles.tableItemName}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          {`${bid.owner.first_name} ${bid.owner.last_name}`}
        </div>
        <div className={styles.tableItemDate}>{formatDate(bid.created_at)}</div>
        <button className={styles.tableItemPrice}>{bid.amount} €</button>
      </div>
    </div>
  )
}

export default BiddingHistoryTable
