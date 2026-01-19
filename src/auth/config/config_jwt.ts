export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'fallbackSecretKey_CHANGE_ME',
  expired: 3600,
}