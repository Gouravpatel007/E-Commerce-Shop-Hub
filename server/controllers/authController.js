import { OAuth2Client } from 'google-auth-library'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const client = new OAuth2Client()

export const googleLogin = async (req, res) => {
  const { token } = req.body

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })

    const payload = ticket.getPayload()
    const { email, name, picture } = payload

    let user = await User.findOne({ email })

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
      })
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.status(200).json({ token: jwtToken, user })
  } catch (error) {
    console.error('Google login error', error)
    res.status(401).json({ message: 'Google login failed' })
  }
}
