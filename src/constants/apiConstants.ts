export enum apiRoutes {
  LOGIN = '/auth/login',
  SIGNUP = '/auth/signup',
  FETCH_USER = '/me',
  UPDATE_PASSWORD = '/me/update-password',
  AUCTION_PREFIX = '/me/auction',
  UPLOAD_AUCTION = '/me/auction',
  UPDATE_AUCTION = '/me/auction/:id',
  FETCH_AUCTIONS = '/auctions',
  BID_AUCTION = '/auctions/:id/bid',
}
