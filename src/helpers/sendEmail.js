import nodemailer from 'nodemailer'

import { emailFrom, nodemailerTransport } from '~/config'

const sendEmail = async options => {
  const transporter = nodemailer.createTransport({
    ...nodemailerTransport
  })

  const mailOptions = {
    from: emailFrom,
    to: options.to,
    subject: options.subject,
    html: options.text
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log('sendMail error', error)
  }
}

export default sendEmail
