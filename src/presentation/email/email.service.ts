import nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";

interface SendMailOptions {
    to: string;
    subject: string;
    htmlBody: string;
    //attachments?: any[];
}

// todo: Attachments

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });
  async sendEmail(options: SendMailOptions):Promise<boolean>{
    const { to, subject, htmlBody } = options;


    try {
        const sentInformation = await this.transporter.sendMail({
            to, subject, html: htmlBody
        })

        return true;
    } catch (error) {
        console.log('Error sending email', error);
        return false;
        
    }
  }
}
