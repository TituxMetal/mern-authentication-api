import { model, Schema } from 'mongoose'

import { stringToHash } from '~/helpers'

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    resetToken: {
      token: { type: String, default: null },
      expire: { type: Date, default: null }
    }
  },
  { timestamps: true }
)

userSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: (doc, { _id, password, ...rest }) => rest
})

userSchema.pre('save', async function preSave(done) {
  if (this.isModified('password')) {
    const hash = await stringToHash(this.get('password'))

    this.set('password', hash)
  }

  done()
})

const User = model('User', userSchema)

export default User
