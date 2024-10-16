import { FC } from 'react'
import styles from 'styles/scss/Overlays.module.scss'
import { useOverlay } from './OverlayContext'
import { userStorage } from 'utils/localStorage'
import { useQuery } from 'react-query'
import * as API from 'api/Api'
import { AxiosError } from 'axios'
import { StatusCode } from 'constants/errorConstants'
import { errorStore } from 'stores/error.store'
import { NotificationType } from 'models/notification'
import NotificationComponent from './NotificationComponent'

const Notification: FC = () => {
  const token = userStorage.getToken()
  const { data, isLoading, refetch } = useQuery(
    ['fetchUserNotifications'],
    () => {
      if (token) {
        return API.fetchUserNotifications(token)
      }
      return Promise.resolve([])
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      onError: (error: AxiosError) => {
        if (error.response?.status === StatusCode.UNAUTHORIZED) {
          errorStore.setError('You are not authenticated. Please log in.')
        } else {
          errorStore.setError('An error occurred while fetching auctions.')
        }
      },
    },
  )
  const { toggleNotification } = useOverlay()

  const markAllNotificationsAsRead = async () => {
    if (!token || !data?.data.length) return
    await Promise.all(
      data.data.map((notification: NotificationType) =>
        API.setUserNotificationAsRead(token, notification.id),
      ),
    )
    toggleNotification()
    refetch()
  }

  const setNotificationAsRead = (notification: NotificationType) => {
    if (!notification || !token) return
    API.setUserNotificationAsRead(token, notification.id).then(() => {
      refetch()
    })
  }

  if (data?.data.length === 0) {
    return (
      <div className={styles.notificationsContainer}>
        <div className={styles.notificationsHeader}>
          <h4 className={styles.notificationsHeaderText}>Notifications</h4>
          <button className={styles.notificationsHeaderButton}>
            Clear all
          </button>
        </div>
        <div className={styles.notificationsEmptyMessage}>
          No notifications.
        </div>
      </div>
    )
  }

  if (errorStore.showError) {
    return (
      <div className={styles.notificationsContainer}>
        <div className={styles.notificationsHeader}>
          <h4 className={styles.notificationsHeaderText}>Notifications</h4>
          <button className={styles.notificationsHeaderButton}>
            Clear all
          </button>
        </div>
        <div className={styles.notificationsEmptyMessage}>
          <div className={styles.error}>{errorStore.apiError}</div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className={styles.notificationsContainer}>
        <div className={styles.notificationsHeader}>
          <h4 className={styles.notificationsHeaderText}>Notifications</h4>
          <button
            className={styles.notificationsHeaderButton}
            onClick={() => markAllNotificationsAsRead()}
          >
            Clear all
          </button>
        </div>
        <div className={styles.notificationsEmptyMessage}>
          Loading notifications ...
        </div>
      </div>
    )
  }

  return (
    <div className={styles.notificationsContainer}>
      <div className={styles.notificationsHeader}>
        <h4 className={styles.notificationsHeaderText}>Notifications</h4>
        <button
          className={styles.notificationsHeaderButton}
          onClick={markAllNotificationsAsRead}
        >
          Clear all
        </button>
      </div>
      <div className={styles.notificationsEmptyMessage}>
        {data?.data.map((notification: NotificationType, index: number) => (
          <NotificationComponent
            notification={notification}
            key={index}
            setNotificationAsRead={() => setNotificationAsRead(notification)}
          />
        ))}
      </div>
    </div>
  )
}

export default Notification
