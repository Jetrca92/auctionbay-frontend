import { FC } from 'react'
import styles from 'styles/scss/Overlays.module.scss'
import noImage from 'styles/images/empty-image.png'
import { NotificationType } from 'models/notification'
import { routes } from 'constants/routesConstants'
import { Link } from 'react-router-dom'
import TagSm from 'components/ui/TagSm'
import { getMinBidAmount } from 'models/auction'
import { setUserNotificationAsRead } from 'api/Auction'
import { userStorage } from 'utils/localStorage'
import { useOverlay } from './OverlayContext'

interface NotificationComponentProps {
  notification: NotificationType
  setNotificationAsRead: (token: string, notificationId: string) => void
}

const NotificationComponent: FC<NotificationComponentProps> = ({
  notification,
}) => {
  const { toggleNotification } = useOverlay()
  if (!notification) return <></>
  const token = userStorage.getToken()
  if (!token) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate())
    const month = String(date.getMonth() + 1) // Months are zero-based
    const year = date.getFullYear()

    const formattedDate = `${day}.${month}.${year}`
    return formattedDate
  }

  const total = getMinBidAmount(notification.auction) - 1

  return (
    <Link
      className={styles.notificationComponentContainer}
      to={`${routes.AUCTION_PREFIX}/${notification.auction.id}`}
      onClick={() => {
        setUserNotificationAsRead(token, notification.id)
        toggleNotification()
      }}
    >
      <div className={styles.notificationComponentInner}>
        {notification.auction.image ? (
          <img
            src={notification.auction.image}
            alt={notification.auction.title}
            className={styles.notificationComponentImage}
          />
        ) : (
          <img
            src={noImage}
            alt={notification.auction.title}
            className={styles.notificationComponentImage}
          />
        )}
        <div className={styles.notificationComponentTitle}>
          <div className={styles.notificationComponentTitleMain}>
            {notification.auction.title}
          </div>
          <div className={styles.notificationComponentTitleDate}>
            {formatDate(notification.created_at)}
          </div>
        </div>
        <div className={styles.notificationStatusTag}>
          <TagSm>{notification.message}</TagSm>
        </div>
        <div className={styles.notificationStatusTag}>
          {notification.message === 'outbid' ? (
            <TagSm>Done</TagSm>
          ) : (
            <TagSm>{`${total}eur`}</TagSm>
          )}
        </div>
      </div>
    </Link>
  )
}

export default NotificationComponent
