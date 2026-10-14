import { demoUsers } from '../data/demoUsers'

export const loginUser = async ({ emailOrPhone, password }) => {
  const normalized = String(emailOrPhone).trim().toLowerCase()
  const user = demoUsers.find(
    (item) =>
      item.email.toLowerCase() === normalized || item.phone === normalized ||
      item.email.toLowerCase() === normalized,
  )

  if (!user || user.password !== password) {
    throw new Error('Invalid email/phone or password.')
  }

  return { user: { ...user, password: undefined } }
}

export const registerUser = async (payload) => {
  const newUser = {
    id: `user-${Date.now()}`,
    ...payload,
    registrationDate: new Date().toISOString().slice(0, 10),
    accountStatus: 'Active',
  }

  return { user: newUser }
}
