import { MailAdapter, SendMailData } from '../mail-adapter';

import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '2ae0dd1e89568c',
    pass: '8ccbdb8d517c2b',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Tiago Guatierri <tiagovit@gmail.com>',
      subject,
      html: body,
    });
  }
}
